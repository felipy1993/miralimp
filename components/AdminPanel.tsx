import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Upload, Save, Image as ImageIcon, Type, Phone, Mail, Instagram, MapPin, LogOut, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { ref, set, update, onValue } from 'firebase/database';
import { ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth, storage } from '../firebase';
import { useSiteData } from '../context/SiteContentContext';
import { DEFAULT_CONTENT, type SiteContent, type BeforeAfterProject } from '../hooks/useSiteContent';



const AdminPanel: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { content: currentContent, loading } = useSiteData();
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [activeTab, setActiveTab] = useState<'contact' | 'hero' | 'images'>('contact');
  const [saveMessage, setSaveMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Escutar estado de autenticação do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Monitorar conexão com o Firebase
    const connectedRef = ref(db, ".info/connected");
    const unsubConn = onValue(connectedRef, (snap) => {
      setIsConnected(snap.val() === true);
    });

    // Só sincroniza o estado local com o banco na PRIMEIRA vez que carrega
    if (!loading && currentContent && !hasInitialized) {
      // Sanitiza todos os links que já estão no banco ao carregar
      const sanitizedData = { ...currentContent };
      (Object.keys(sanitizedData) as Array<keyof SiteContent>).forEach(key => {
        if (typeof sanitizedData[key] === 'string' && (sanitizedData[key] as string).includes('drive.google.com')) {
          (sanitizedData[key] as any) = sanitizeUrl(sanitizedData[key] as string);
        }
      });
      setContent(sanitizedData);
      setHasInitialized(true);
    }

    return () => unsubConn();
  }, [currentContent, loading, hasInitialized]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, login, password);
    } catch (err: any) {
      console.error(err);
      setError('E-mail ou senha incorretos!');
    }
  };

  const sanitizeUrl = (url: string) => {
    if (!url) return '';
    // Se for Google Drive link de compartilhamento comum
    if (url.includes('drive.google.com')) {
      // Pega o ID entre /d/ e a próxima barra ou fim da linha
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return url;
  };

  const handleUrlChange = (field: keyof SiteContent, value: string) => {
    const sanitized = sanitizeUrl(value);
    setContent(prev => ({ ...prev, [field]: sanitized }));
  };

  const addProject = () => {
    const newProject: BeforeAfterProject = {
      id: Date.now().toString(),
      before: '',
      after: '',
      title: 'Meu Novo Projeto',
      description: ''
    };
    setContent(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProject]
    }));
  };

  const removeProject = (id: string) => {
    if (confirm('Tem certeza que deseja apagar este projeto de Antes/Depois?')) {
      setContent(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
    }
  };

  const updateProject = (id: string, updates: Partial<BeforeAfterProject>) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map(p => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          // Sanitizar URLs se forem passadas
          if (updates.before) updated.before = sanitizeUrl(updates.before);
          if (updates.after) updated.after = sanitizeUrl(updates.after);
          return updated;
        }
        return p;
      })
    }));
  };

  // Removido handleImageUpload devido a restrições de CORS no Firebase Storage do usuário
  // Mantemos o estado de upload apenas para não quebrar referências visuais se necessário
  const [isExternalLinkOpen, setIsExternalLinkOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setError('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    
    // Alerta se não houver conexão
    if (!isConnected) {
      setSaveMessage('❌ Sem conexão com o Firebase (Aguardando...)');
      // Não bloqueia o salvamento pois o Firebase pode estar em modo offline, 
      // mas avisa o usuário porque pode ser por isso que está travado.
    }
    
    try {
      setIsSaving(true);
      setSaveMessage('⏳ Salvando...');
      
      const contentRef = ref(db, 'site_content');
      
      // Criar um timeout de 15 segundos para o salvamento
      const savePromise = set(contentRef, content);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Tempo limite excedido: O Firebase não respondeu em 15 segundos.')), 15000)
      );

      await Promise.race([savePromise, timeoutPromise]);
      
      setSaveMessage('✅ Salvo!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (e: any) {
      console.error('Erro ao salvar:', e);
      setSaveMessage(`❌ ${e.message || 'Erro de conexão'}`);
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-brand-navy-900/95 backdrop-blur-xl overflow-y-auto p-4"
      >
        <div className="min-h-screen flex items-center justify-center py-8">
          <button 
            onClick={onClose}
            className="fixed top-6 right-6 text-gray-400 hover:text-white transition-colors z-50"
          >
            <X size={32} />
          </button>

          {isAuthLoading ? (
            <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          ) : !isAuthenticated ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md bg-brand-navy-800 p-8 rounded-2xl border border-brand-gold/20 shadow-2xl"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-4">
                  <Lock className="text-brand-navy-900" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white font-serif">Acesso Administrativo</h2>
                <p className="text-gray-400 text-sm mt-2 text-center">Digite a senha para gerenciar o conteúdo</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">E-mail de Acesso</label>
                  <input 
                    type="email" 
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Seu e-mail"
                    className="w-full bg-brand-navy-900 border border-brand-gold/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Senha</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    className="w-full bg-brand-navy-900 border border-brand-gold/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gold-gradient text-brand-navy-900 font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                >
                  Entrar no Painel
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-6xl bg-brand-navy-800 p-8 rounded-2xl border border-brand-gold/20 shadow-2xl my-8"
            >
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <div>
                  <h2 className="text-3xl font-bold text-white font-serif">Painel de Controle</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 animate-pulse'}`}></div>
                    <span className="text-xs text-gray-400 font-medium">
                      {isConnected ? 'Conectado ao Firebase' : 'Desconectado / Reconectando...'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-medium bg-white/5 px-4 py-2 rounded-lg border border-white/10"
                >
                  <LogOut size={16} />
                  Sair do Painel
                </button>
              </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/5">
              <button
                onClick={() => setActiveTab('contact')}
                className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'contact' 
                    ? 'text-brand-gold border-b-2 border-brand-gold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Phone size={18} />
                Informações de Contato
              </button>
              <button
                onClick={() => setActiveTab('hero')}
                className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'hero' 
                    ? 'text-brand-gold border-b-2 border-brand-gold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Type size={18} />
                Textos Principais
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'images' 
                    ? 'text-brand-gold border-b-2 border-brand-gold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon size={18} />
                Imagens
              </button>
            </div>

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Nome da Empresa</label>
                    <input
                      type="text"
                      value={content.companyName}
                      onChange={(e) => setContent(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Subtítulo</label>
                    <input
                      type="text"
                      value={content.companySubtitle}
                      onChange={(e) => setContent(prev => ({ ...prev, companySubtitle: e.target.value }))}
                      className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                      <Phone size={14} />
                      WhatsApp (com código do país)
                    </label>
                    <input
                      type="text"
                      value={content.whatsappNumber}
                      onChange={(e) => setContent(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                      placeholder="5517992265090"
                      className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Telefone (exibição)</label>
                    <input
                      type="text"
                      value={content.phoneDisplay}
                      onChange={(e) => setContent(prev => ({ ...prev, phoneDisplay: e.target.value }))}
                      placeholder="(17) 99226-5090"
                      className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                      <Mail size={14} />
                      Email
                    </label>
                    <input
                      type="email"
                      value={content.email}
                      onChange={(e) => setContent(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                      <MapPin size={14} />
                      Região de Atendimento
                    </label>
                    <input
                      type="text"
                      value={content.region}
                      onChange={(e) => setContent(prev => ({ ...prev, region: e.target.value }))}
                      className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                      <Instagram size={14} />
                      Link do Instagram
                    </label>
                    <input
                      type="url"
                      value={content.instagramLink}
                      onChange={(e) => setContent(prev => ({ ...prev, instagramLink: e.target.value }))}
                      className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Horário de Funcionamento</label>
                    <input
                      type="text"
                      value={content.businessHours}
                      onChange={(e) => setContent(prev => ({ ...prev, businessHours: e.target.value }))}
                      className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Hero Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Título Principal (Hero)</label>
                  <input
                    type="text"
                    value={content.heroTitle}
                    onChange={(e) => setContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                    className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Subtítulo (Hero)</label>
                  <input
                    type="text"
                    value={content.heroSubtitle}
                    onChange={(e) => setContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Descrição (Hero)</label>
                  <textarea
                    value={content.heroDescription}
                    onChange={(e) => setContent(prev => ({ ...prev, heroDescription: e.target.value }))}
                    rows={4}
                    className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-8">
                <div className="p-4 bg-brand-navy-800/80 border border-brand-gold/30 rounded-lg">
                  <h4 className="text-brand-gold font-bold text-sm mb-2 flex items-center gap-2">
                    <ImageIcon size={16} /> Como Adicionar Fotos
                  </h4>
                  <div className="text-xs text-gray-400 space-y-2 leading-relaxed">
                    <p>
                      Para garantir que as fotos nunca apaguem e funcionem sempre, use o site <strong>PostImages.org</strong>:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 ml-1">
                      <li>Clique no botão dourado <strong>"Ir para PostImages"</strong> abaixo.</li>
                      <li>Suba sua foto do computador ou celular.</li>
                      <li>Após carregar, copie o link que diz <strong>"Link direto"</strong>.</li>
                      <li>Cole o link no campo correspondente aqui no painel e clique em <strong>Salvar</strong>.</li>
                    </ol>
                  </div>
                  <a 
                    href="https://postimages.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-navy-900 rounded font-bold text-xs hover:scale-105 transition-all"
                  >
                    <Upload size={14} />
                    Ir para PostImages.org
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hero Image */}
                  <div className="space-y-3">
                    <label className="text-sm text-gray-400 block">Imagem de Fundo (Hero)</label>
                    <div className="relative group">
                      <img src={content.heroImage} alt="Hero" className="w-full h-40 object-cover rounded-lg border border-white/10" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">Link da Imagem</label>
                      <input
                        type="url"
                        value={content.heroImage}
                        onChange={(e) => handleUrlChange('heroImage', e.target.value)}
                        placeholder="Cole o link direto aqui..."
                        className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                  </div>

                  {/* Logo */}
                  <div className="space-y-3">
                    <label className="text-sm text-gray-400 block">Logo</label>
                    <div className="relative group">
                      <div className="w-full h-40 bg-brand-navy-900 rounded-lg border border-white/10 flex items-center justify-center p-4">
                        <img src={content.logoImage} alt="Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">Link da Logo</label>
                      <input
                        type="url"
                        value={content.logoImage}
                        onChange={(e) => handleUrlChange('logoImage', e.target.value)}
                        placeholder="Cole o link direto aqui..."
                        className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="p-6 bg-brand-navy-900/50 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-white font-bold">Seção "Por que a Miralimp?"</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm text-gray-400 block">Imagem da Seção</label>
                      <div className="relative group">
                        <img src={content.whyChooseUsImage} alt="Why Choose Us" className="w-full h-40 object-cover rounded-lg border border-white/10" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">Link da Imagem Section</label>
                        <input
                          type="url"
                          value={content.whyChooseUsImage}
                          onChange={(e) => handleUrlChange('whyChooseUsImage', e.target.value)}
                          placeholder="Cole o link direto aqui..."
                          className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm text-gray-400 block">Frase em Destaque</label>
                      <textarea
                        value={content.whyChooseUsQuote}
                        onChange={(e) => setContent(prev => ({ ...prev, whyChooseUsQuote: e.target.value }))}
                        placeholder="Frase inspiradora..."
                        rows={4}
                        className="w-full bg-brand-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                      />
                      <p className="text-xs text-gray-500">Esta frase aparece sobre a imagem da seção "Por que a Miralimp?"</p>
                    </div>
                  </div>
                </div>

                {/* Dynamic Before/After Projects */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                      <ImageIcon size={20} className="text-brand-gold" /> Galeria de Resultados (Antes e Depois)
                    </h4>
                    <button 
                      onClick={addProject}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm transition-all"
                    >
                      <Plus size={18} /> Adicionar Novo Caso
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-8">
                    {content.projects && content.projects.map((project, index) => (
                      <div key={project.id} className="p-6 bg-brand-navy-900/50 rounded-xl border border-brand-gold/20 space-y-4 relative group">
                        <div className="flex justify-between items-start">
                          <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">Projeto #{index + 1}</span>
                          <button 
                            onClick={() => removeProject(project.id)}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                            title="Remover Projeto"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="text-xs text-gray-400 block mb-1 font-bold">TÍTULO</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => updateProject(project.id, { title: e.target.value })}
                                placeholder="Ex: Restauração de Sofá de Couro"
                                className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-brand-gold outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 block mb-1 font-bold">DESCRIÇÃO</label>
                              <textarea
                                value={project.description}
                                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                                placeholder="Descreva o que foi feito..."
                                rows={3}
                                className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-brand-gold outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs text-gray-500 uppercase font-bold">Link Antes (PostImages)</label>
                              <div className="h-24 bg-black/20 rounded border border-white/5 overflow-hidden">
                                {project.before ? (
                                  <img src={project.before} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600">Sem Foto</div>
                                )}
                              </div>
                              <input
                                type="url"
                                value={project.before}
                                onChange={(e) => updateProject(project.id, { before: e.target.value })}
                                placeholder="Cole o link aqui"
                                className="w-full bg-brand-navy-900 border border-white/10 rounded px-2 py-1.5 text-[11px] text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs text-gray-500 uppercase font-bold">Link Depois (PostImages)</label>
                              <div className="h-24 bg-black/20 rounded border border-white/5 overflow-hidden">
                                {project.after ? (
                                  <img src={project.after} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600">Sem Foto</div>
                                )}
                              </div>
                              <input
                                type="url"
                                value={project.after}
                                onChange={(e) => updateProject(project.id, { after: e.target.value })}
                                placeholder="Cole o link aqui"
                                className="w-full bg-brand-navy-900 border border-white/10 rounded px-2 py-1.5 text-[11px] text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {(!content.projects || content.projects.length === 0) && (
                    <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-xl">
                      <p className="text-gray-500 italic">Nenhum projeto adicionado. Clique no botão acima para começar!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                {saveMessage && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-sm font-medium ${saveMessage.includes('❌') ? 'text-red-500' : 'text-brand-gold'}`}
                  >
                    {saveMessage}
                  </motion.p>
                )}
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={onClose}
                  disabled={isSaving}
                  className="flex-1 md:flex-none px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 md:flex-none px-10 py-3 bg-gold-gradient text-brand-navy-900 font-bold rounded shadow-lg hover:shadow-brand-gold/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-brand-navy-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save size={18} />
                  )}
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;
