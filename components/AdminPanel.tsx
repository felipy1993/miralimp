import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Upload, Check, Trash2 } from 'lucide-react';

const AdminPanel: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'miralimp2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta!');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-brand-navy-900/95 backdrop-blur-xl flex items-center justify-center p-4"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        {!isAuthenticated ? (
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

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha de acesso"
                  className="w-full bg-brand-navy-900 border border-brand-gold/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                />
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
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
            className="w-full max-w-5xl bg-brand-navy-800 p-8 rounded-2xl border border-brand-gold/20 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-white/5">
              <div>
                <h2 className="text-3xl font-bold text-white font-serif">Painel de Controle</h2>
                <p className="text-gray-400">Gerencie as imagens e conteúdos do site</p>
              </div>
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                Sair
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Profile Image / Logo Management */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2">
                   <Check size={20} />
                   Imagens do Portfólio (Antes/Depois)
                </h3>
                
                <div className="space-y-8">
                   {[1, 2].map(id => (
                     <div key={id} className="p-6 bg-brand-navy-900/50 rounded-xl border border-white/5 space-y-4">
                        <p className="text-sm font-bold text-white">Projeto #{id}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-xs text-gray-500 uppercase">Imagem Antes</label>
                             <div className="h-32 bg-brand-navy-800 rounded border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold/50 transition-colors">
                                <Upload size={20} className="text-gray-600 mb-2" />
                                <span className="text-[10px] text-gray-600">Upload JPG/PNG</span>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs text-gray-500 uppercase">Imagem Depois</label>
                             <div className="h-32 bg-brand-navy-800 rounded border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold/50 transition-colors">
                                <Upload size={20} className="text-gray-600 mb-2" />
                                <span className="text-[10px] text-gray-600">Upload JPG/PNG</span>
                             </div>
                          </div>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Título do Projeto"
                          className="w-full bg-brand-navy-900 border border-white/10 rounded px-3 py-2 text-sm text-white"
                        />
                        <button className="text-xs text-red-500 flex items-center gap-1 hover:text-red-400 transition-colors">
                          <Trash2 size={14} /> Remover Projeto
                        </button>
                     </div>
                   ))}
                   
                   <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-gray-500 hover:border-brand-gold/30 hover:text-brand-gold transition-all text-sm font-medium">
                      + Adicionar Novo Projeto
                   </button>
                </div>
              </div>

              {/* General Site Images */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2">
                   <Check size={20} />
                   Outras Imagens
                </h3>

                <div className="grid grid-cols-1 gap-6">
                  <div className="p-6 bg-brand-navy-900/50 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Wallpaper do Hero</p>
                      <p className="text-[10px] text-gray-500">Imagem principal do topo do site</p>
                    </div>
                    <button className="px-4 py-2 bg-white/5 rounded text-xs text-white hover:bg-white/10 border border-white/10">Trocar</button>
                  </div>

                  <div className="p-6 bg-brand-navy-900/50 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Logo do Site</p>
                      <p className="text-[10px] text-gray-500">PNG transparente (Cabeçalho/Rodapé)</p>
                    </div>
                    <button className="px-4 py-2 bg-white/5 rounded text-xs text-white hover:bg-white/10 border border-white/10">Trocar</button>
                  </div>
                </div>

                <div className="mt-12 bg-blue-900/10 p-6 rounded-xl border border-blue-900/20">
                    <h4 className="text-white font-bold mb-2">Aviso Importante</h4>
                    <p className="text-sm text-blue-200/60 leading-relaxed">
                      Este painel é uma ferramenta de prototipagem rápida. As imagens alteradas aqui serão salvas localmente no seu navegador para demonstração. Para um sistema de produção persistente, recomendamos a integração com Firebase ou AWS.
                    </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-4">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button className="px-10 py-2 bg-gold-gradient text-brand-navy-900 font-bold rounded shadow-lg">
                  Salvar Alterações
                </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;
