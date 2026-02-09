import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Upload, Save, Image as ImageIcon, Type, Phone, Mail, Instagram, MapPin, LogOut, Eye, EyeOff } from 'lucide-react';
import { ref, set } from 'firebase/database';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useSiteContent, DEFAULT_CONTENT } from '../hooks/useSiteContent';

interface SiteContent {
  // Informações de Contato
  companyName: string;
  companySubtitle: string;
  whatsappNumber: string;
  phoneDisplay: string;
  email: string;
  region: string;
  instagramLink: string;
  businessHours: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Imagens
  heroImage: string;
  logoImage: string;
  whyChooseUsImage: string;
  whyChooseUsQuote: string;
  beforeAfter1Before: string;
  beforeAfter1After: string;
  beforeAfter1Title: string;
  beforeAfter1Description: string;
  beforeAfter2Before: string;
  beforeAfter2After: string;
  beforeAfter2Title: string;
  beforeAfter2Description: string;
}

const AdminPanel: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { content: currentContent, loading } = useSiteContent();
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [activeTab, setActiveTab] = useState<'contact' | 'hero' | 'images'>('contact');
  const [saveMessage, setSaveMessage] = useState('');

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
    if (!loading && currentContent) {
      setContent(currentContent);
    }
  }, [currentContent, loading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, login, password);
      // O onAuthStateChanged vai cuidar de setar o isAuthenticated
    } catch (err: any) {
      console.error(err);
      setError('E-mail ou senha incorretos!');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setError('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      setSaveMessage('Salvando...');
      const contentRef = ref(db, 'site_content');
      await set(contentRef, content);
      
      setSaveMessage('✓ Alterações salvas no Firebase!');
      
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    } catch (e) {
      console.error('Erro ao salvar:', e);
      setSaveMessage('❌ Erro ao salvar no Firebase');
    }
  };

  const handleImageUpload = (field: keyof SiteContent, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
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
                  <p className="text-gray-400">Gerencie todo o conteúdo do site</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hero Image */}
                  <div className="space-y-3">
                    <label className="text-sm text-gray-400 block">Imagem de Fundo (Hero)</label>
                    <div className="relative">
                      <img src={content.heroImage} alt="Hero" className="w-full h-40 object-cover rounded-lg border border-white/10" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('heroImage', e)}
                        className="hidden"
                        id="heroImage"
                      />
                      <label
                        htmlFor="heroImage"
                        className="absolute bottom-2 right-2 bg-brand-gold text-brand-navy-900 px-3 py-1 rounded text-xs font-bold cursor-pointer hover:shadow-lg transition-all"
                      >
                        Trocar
                      </label>
                    </div>
                  </div>

                  {/* Logo */}
                  <div className="space-y-3">
                    <label className="text-sm text-gray-400 block">Logo</label>
                    <div className="relative">
                      <div className="w-full h-40 bg-brand-navy-900 rounded-lg border border-white/10 flex items-center justify-center">
                        <img src={content.logoImage} alt="Logo" className="max-h-32 object-contain" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('logoImage', e)}
                        className="hidden"
                        id="logoImage"
                      />
                      <label
                        htmlFor="logoImage"
                        className="absolute bottom-2 right-2 bg-brand-gold text-brand-navy-900 px-3 py-1 rounded text-xs font-bold cursor-pointer hover:shadow-lg transition-all"
                      >
                        Trocar
                      </label>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="p-6 bg-brand-navy-900/50 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-white font-bold">Seção "Por que a Miralimp?"</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm text-gray-400 block">Imagem da Seção</label>
                      <div className="relative">
                        <img src={content.whyChooseUsImage} alt="Why Choose Us" className="w-full h-40 object-cover rounded-lg border border-white/10" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('whyChooseUsImage', e)}
                          className="hidden"
                          id="whyChooseUsImage"
                        />
                        <label
                          htmlFor="whyChooseUsImage"
                          className="absolute bottom-2 right-2 bg-brand-gold text-brand-navy-900 px-3 py-1 rounded text-xs font-bold cursor-pointer hover:shadow-lg transition-all"
                        >
                          Trocar
                        </label>
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

                {/* Before/After Project 1 */}
                <div className="p-6 bg-brand-navy-900/50 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-white font-bold">Projeto Antes/Depois #1</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase">Imagem Antes</label>
                      <div className="relative">
                        <img src={content.beforeAfter1Before} alt="Antes" className="w-full h-32 object-cover rounded border border-white/10" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('beforeAfter1Before', e)}
                          className="hidden"
                          id="ba1Before"
                        />
                        <label htmlFor="ba1Before" className="absolute bottom-1 right-1 bg-brand-gold text-brand-navy-900 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">
                          Trocar
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase">Imagem Depois</label>
                      <div className="relative">
                        <img src={content.beforeAfter1After} alt="Depois" className="w-full h-32 object-cover rounded border border-white/10" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('beforeAfter1After', e)}
                          className="hidden"
                          id="ba1After"
                        />
                        <label htmlFor="ba1After" className="absolute bottom-1 right-1 bg-brand-gold text-brand-navy-900 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">
                          Trocar
                        </label>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={content.beforeAfter1Title}
                    onChange={(e) => setContent(prev => ({ ...prev, beforeAfter1Title: e.target.value }))}
                    placeholder="Título do Projeto"
                    className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white"
                  />
                  <textarea
                    value={content.beforeAfter1Description}
                    onChange={(e) => setContent(prev => ({ ...prev, beforeAfter1Description: e.target.value }))}
                    placeholder="Descrição"
                    rows={2}
                    className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white"
                  />
                </div>

                {/* Before/After Project 2 */}
                <div className="p-6 bg-brand-navy-900/50 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-white font-bold">Projeto Antes/Depois #2</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase">Imagem Antes</label>
                      <div className="relative">
                        <img src={content.beforeAfter2Before} alt="Antes" className="w-full h-32 object-cover rounded border border-white/10" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('beforeAfter2Before', e)}
                          className="hidden"
                          id="ba2Before"
                        />
                        <label htmlFor="ba2Before" className="absolute bottom-1 right-1 bg-brand-gold text-brand-navy-900 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">
                          Trocar
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase">Imagem Depois</label>
                      <div className="relative">
                        <img src={content.beforeAfter2After} alt="Depois" className="w-full h-32 object-cover rounded border border-white/10" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('beforeAfter2After', e)}
                          className="hidden"
                          id="ba2After"
                        />
                        <label htmlFor="ba2After" className="absolute bottom-1 right-1 bg-brand-gold text-brand-navy-900 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">
                          Trocar
                        </label>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={content.beforeAfter2Title}
                    onChange={(e) => setContent(prev => ({ ...prev, beforeAfter2Title: e.target.value }))}
                    placeholder="Título do Projeto"
                    className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white"
                  />
                  <textarea
                    value={content.beforeAfter2Description}
                    onChange={(e) => setContent(prev => ({ ...prev, beforeAfter2Description: e.target.value }))}
                    placeholder="Descrição"
                    rows={2}
                    className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
              <div>
                {saveMessage && (
                  <p className="text-green-500 text-sm font-medium">{saveMessage}</p>
                )}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="px-10 py-3 bg-gold-gradient text-brand-navy-900 font-bold rounded shadow-lg hover:shadow-brand-gold/30 transition-all flex items-center gap-2"
                >
                  <Save size={18} />
                  Salvar Alterações
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
