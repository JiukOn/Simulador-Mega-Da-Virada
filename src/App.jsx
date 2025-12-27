import React, { useState, useEffect } from 'react';
import { MARKET_DATA_2025, CURIOSIDADES_AVANCADAS } from './database';
import { 
  Plane, Building2, Briefcase, Film, HeartPulse, GraduationCap, Coins, 
  TrendingUp, PiggyBank, BarChart3, AlertTriangle, Gamepad2, Smartphone, 
  Car, Fuel, Bitcoin, Globe, ShoppingBag, Megaphone, Clapperboard, BookOpen,
  Tractor, TrainFront, Server, Users, Cone, Landmark, Ticket, HelpCircle,
  Dna, Shuffle, CheckCircle, ArrowRightLeft, ShieldCheck, Calculator
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Legend, Cell
} from 'recharts';

const PROBABILIDADES = {
  6: '1 em 50.063.860',
  7: '1 em 7.151.980',
  8: '1 em 1.787.995',
  9: '1 em 595.998',
  10: '1 em 238.399',
  11: '1 em 108.363',
  12: '1 em 54.182',
  13: '1 em 29.175',
  14: '1 em 16.671',
  15: '1 em 10.003'
};

const formatCurrency = (val, currency = 'BRL') => {
  if (currency === 'BTC') return `₿ ${val.toFixed(8)}`;
  if (currency === 'ETH') return `Ξ ${val.toFixed(6)}`;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency }).format(val);
};

const formatNumber = (num) => new Intl.NumberFormat('pt-BR').format(Math.floor(num));

const SectionTitle = ({ icon: Icon, title }) => (
  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-200 mb-6 mt-10 border-b border-white/10 pb-2">
    <Icon className="w-5 h-5 text-emerald-400" /> {title}
  </h3>
);

const StatCard = ({ icon: Icon, title, value, subtitle, color = "text-emerald-400" }) => (
  <div className="glass-card p-5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all group">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Estimativa</span>
    </div>
    <h3 className="text-2xl font-bold text-slate-100 mb-1">{value}</h3>
    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
    <p className="text-xs text-slate-600 border-t border-white/5 pt-2 mt-2">{subtitle}</p>
  </div>
);

export default function MegaViradaSimulator() {
  const [activeTab, setActiveTab] = useState('spending'); 
  const [premioTotal, setPremioTotal] = useState(1000000000); 
  const [gastoMensal, setGastoMensal] = useState(50000);
  const [anosDuracao, setAnosDuracao] = useState(0);
  const [stats, setStats] = useState({});
  const [perfilInvestidor, setPerfilInvestidor] = useState('conservador'); 
  const [projecaoInvestimento, setProjecaoInvestimento] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('BRL');
  const [convertedValues, setConvertedValues] = useState({ total: 0, monthly: 0 });
  
  const [qtdDezenas, setQtdDezenas] = useState(6);
  const [numerosGerados, setNumerosGerados] = useState([]);

  useEffect(() => {
    const gastoAnual = gastoMensal * 12;
    const tempoAnos = premioTotal / (gastoAnual || 1); 
    const orcamentoGasolina = gastoMensal * 0.05;
    const litrosGasolina = orcamentoGasolina / MARKET_DATA.preco_gasolina_media;
    const horasDirigindo = (litrosGasolina * 10) / 60; 

    setAnosDuracao(tempoAnos);

    setStats({
      jogosIndie: premioTotal / MARKET_DATA.custo_jogo_indie,
      jogosAAA: premioTotal / MARKET_DATA.custo_jogo_aaa,
      jogosAAAA: premioTotal / MARKET_DATA.custo_jogo_aaaa_evento,
      filmesBlockbuster: premioTotal / MARKET_DATA.custo_filme_blockbuster,
      seriesEps: premioTotal / MARKET_DATA.custo_serie_ep_premium,
      livros: premioTotal / MARKET_DATA.custo_lancamento_editora,
      
      iphones: premioTotal / MARKET_DATA.preco_iphone_16_pro_max,
      supercarros: premioTotal / MARKET_DATA.preco_supercarro_revuelto,
      jatinhos: premioTotal / MARKET_DATA.preco_jatinho_phenom300e,
      jetskis: premioTotal / MARKET_DATA.preco_jetski_seadoo_gti,
      
      pibBrasilPct: (premioTotal / MARKET_DATA.pib_brasil_nominal) * 100,
      acoesVale: premioTotal / MARKET_DATA.acao_vale3,
      acoesItau: premioTotal / MARKET_DATA.acao_itub4,
      cestasBasicas: premioTotal / MARKET_DATA.preco_cesta_basica_sp,
      salariosMinimos: premioTotal / MARKET_DATA.salario_minimo_2026,
      
      adsImpressions: (premioTotal / MARKET_DATA.custo_ads_cpm_varejo) * 1000,
      servidoresAWS: premioTotal / MARKET_DATA.custo_servidor_aws_m5,

      qtdBtc: premioTotal / MARKET_DATA.btc,
      qtdEth: premioTotal / MARKET_DATA.eth,
      qtdSol: premioTotal / MARKET_DATA.sol,
      qtdOuro: (premioTotal / MARKET_DATA.ouro_grama) / 1000,
      qtdSoja: (premioTotal / MARKET_DATA.soja_saca_60kg),

      horasDirigindo: horasDirigindo,
      diasDirigindo: horasDirigindo / 24,

      escolas: premioTotal / MARKET_DATA.custo_escola_publica,
      hospitais: premioTotal / MARKET_DATA.custo_hospital_alta_complex,
      kmFerrovia: premioTotal / MARKET_DATA.custo_km_ferrovia,
      kmRodoviaManutencao: premioTotal / MARKET_DATA.custo_manutencao_rodovia_km
    });

  }, [premioTotal, gastoMensal]);

  useEffect(() => {
    let rate = 1;
    if (selectedCurrency === 'USD') rate = MARKET_DATA.usd;
    else if (selectedCurrency === 'EUR') rate = MARKET_DATA.eur;
    else if (selectedCurrency === 'JPY') rate = MARKET_DATA.jpy;
    else if (selectedCurrency === 'KRW') rate = MARKET_DATA.krw;
    else if (selectedCurrency === 'BTC') rate = MARKET_DATA.btc;

    setConvertedValues({
      total: premioTotal / rate,
      monthly: gastoMensal / rate
    });
  }, [selectedCurrency, premioTotal, gastoMensal]);

  useEffect(() => {
    let taxaRetornoAnual = 0;
    if (perfilInvestidor === 'conservador') taxaRetornoAnual = MARKET_DATA.taxa_cdi_mercado;
    else if (perfilInvestidor === 'moderado') taxaRetornoAnual = (MARKET_DATA.taxa_cdi_mercado * 0.6) + (MARKET_DATA.taxa_selic_meta * 0.4);
    else taxaRetornoAnual = MARKET_DATA.taxa_selic_meta * 1.1;

    const taxaMensal = Math.pow(1 + taxaRetornoAnual, 1 / 12) - 1;
    const inflacaoMensal = Math.pow(1 + MARKET_DATA.inflacao_ipca_proj, 1 / 12) - 1;

    let saldoAtual = premioTotal;
    let gastoAtual = gastoMensal;
    let dadosGrafico = [];

    for (let mes = 1; mes <= 360; mes++) {
      if (saldoAtual <= 0) saldoAtual = 0;
      const rendimento = saldoAtual * taxaMensal;
      saldoAtual = saldoAtual + rendimento - gastoAtual;
      gastoAtual = gastoAtual * (1 + inflacaoMensal);

      if (mes % 12 === 0) {
        dadosGrafico.push({
          ano: `Ano ${mes / 12}`,
          saldo: saldoAtual,
          gasto: gastoAtual
        });
      }
    }
    setProjecaoInvestimento(dadosGrafico);
  }, [premioTotal, gastoMensal, perfilInvestidor]);

  const gerarNumeros = () => {
    const numeros = new Set();
    while(numeros.size < qtdDezenas) {
      numeros.add(Math.floor(Math.random() * 60) + 1);
    }
    setNumerosGerados(Array.from(numeros).sort((a,b) => a - b));
  };

  const currencyOptions = [
    { code: 'BRL', name: 'Real Brasileiro', icon: '🇧🇷' },
    { code: 'USD', name: 'Dólar Americano', icon: '🇺🇸' },
    { code: 'EUR', name: 'Euro', icon: '🇪🇺' },
    { code: 'JPY', name: 'Iene Japonês', icon: '🇯🇵' },
    { code: 'KRW', name: 'Won Coreano', icon: '🇰🇷' },
    { code: 'BTC', name: 'Bitcoin', icon: '₿' },
  ];

  return (
    <div className="min-h-screen text-slate-200 p-4 md:p-8 pb-32">
      
      <header className="max-w-6xl mx-auto mb-10 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 glow-text tracking-tight animate-fade-in">
          BARÃO DA VIRADA
        </h1>
        <p className="text-slate-400 font-mono text-sm md:text-base uppercase tracking-widest">
          Inteligência Financeira & Simulador 2026
        </p>
      </header>

      <div className="max-w-4xl mx-auto mb-10 glass-panel p-2 rounded-2xl flex flex-wrap justify-center gap-2 relative z-10">
        {[
          { id: 'spending', label: 'Poder de Compra', icon: ShoppingBag },
          { id: 'investing', label: 'Rentabilidade', icon: TrendingUp },
          { id: 'curiosities', label: 'Curiosidades', icon: Dna },
          { id: 'guide', label: 'Guia do Ganhador', icon: ShieldCheck },
          { id: 'generator', label: 'Gerador da Sorte', icon: Ticket },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 text-sm md:text-base ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <tab.icon className="w-4 h-4"/> {tab.label}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-2xl neon-border">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
              <Coins className="w-5 h-5 text-emerald-400"/> Configuração de Capital
            </h2>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Prêmio Bruto (R$)</label>
              <input 
                type="number" 
                value={premioTotal}
                onChange={(e) => setPremioTotal(Number(e.target.value))}
                className="w-full p-4 bg-slate-900/50 rounded-xl border border-white/10 focus:border-emerald-500/50 outline-none text-emerald-400 font-mono font-bold text-xl transition-all"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custo de Vida Mensal (R$)</label>
              <input 
                type="number" 
                value={gastoMensal}
                onChange={(e) => setGastoMensal(Number(e.target.value))}
                className="w-full p-4 bg-slate-900/50 rounded-xl border border-white/10 outline-none text-white font-mono text-lg mb-4"
              />
              <input 
                type="range" 
                min="5000" 
                max="2000000" 
                step="5000"
                value={gastoMensal}
                onChange={(e) => setGastoMensal(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-slate-900/50 border-indigo-500/20">
             <h3 className="font-bold text-indigo-400 mb-4 flex items-center gap-2 text-sm uppercase">
               <ArrowRightLeft className="w-4 h-4"/> Conversor Global
             </h3>
             <div className="grid grid-cols-2 gap-2 mb-4">
               {currencyOptions.map((curr) => (
                 <button 
                  key={curr.code}
                  onClick={() => setSelectedCurrency(curr.code)}
                  className={`p-2 rounded-lg text-xs font-bold border transition-all ${selectedCurrency === curr.code ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-white/10 text-slate-500 hover:bg-white/5'}`}
                 >
                   {curr.icon} {curr.code}
                 </button>
               ))}
             </div>
             <div className="space-y-3 pt-3 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Total na Moeda:</span>
                  <span className="text-sm font-mono font-bold text-white">{formatCurrency(convertedValues.total, selectedCurrency)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Custo Mensal:</span>
                  <span className="text-sm font-mono font-bold text-indigo-300">{formatCurrency(convertedValues.monthly, selectedCurrency)}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          
          {activeTab === 'spending' && (
            <div className="animate-fade-in pb-10 space-y-8">
               
               <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden group border-red-500/20">
                 <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-50"></div>
                 <div className="relative z-10">
                   <p className="text-red-400 font-bold uppercase text-xs tracking-wider mb-2 flex items-center gap-2"><AlertTriangle className="w-3 h-3"/> Cenario: Saques sem Investimento</p>
                   <h2 className="text-5xl md:text-6xl font-black text-white mb-2">{formatNumber(anosDuracao)} <span className="text-2xl text-slate-500">Anos</span></h2>
                   <p className="text-slate-400 text-sm">Duração estimada da fortuna até falência total.</p>
                 </div>
                 <PiggyBank className="w-24 h-24 text-red-500/20 md:text-red-500/10 absolute right-4 md:relative rotate-12"/>
               </div>

               <div>
                 <SectionTitle icon={Gamepad2} title="Entretenimento & Mídia" />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard icon={Gamepad2} title="Jogos Indie" value={formatNumber(stats.jogosIndie)} subtitle="Estúdios Completos" color="text-purple-400"/>
                    <StatCard icon={Gamepad2} title="Jogos AAAA (Evento)" value={formatNumber(stats.jogosAAAA)} subtitle="Financiamento GTA VI" color="text-purple-400"/>
                    <StatCard icon={Clapperboard} title="Blockbusters" value={formatNumber(stats.filmesBlockbuster)} subtitle="Nível Marvel/Avatar" color="text-red-400"/>
                    <StatCard icon={Film} title="Séries Premium" value={formatNumber(stats.seriesEps)} subtitle="Episódios House of Dragon" color="text-red-400"/>
                    <StatCard icon={Megaphone} title="Ads (Impressões)" value={`${formatNumber(stats.adsImpressions/1000000)}M`} subtitle="Milhões de Views" color="text-blue-400"/>
                 </div>
               </div>

               <div>
                 <SectionTitle icon={Smartphone} title="Luxo & Tecnologia" />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard icon={Smartphone} title="iPhones 16 Pro Max" value={formatNumber(stats.iphones)} subtitle="Unidades" color="text-gray-200"/>
                    <StatCard icon={Car} title="Lamborghini Revuelto" value={formatNumber(stats.supercarros)} subtitle="Garagem Cheia" color="text-orange-400"/>
                    <StatCard icon={Plane} title="Jatos Phenom 300E" value={formatNumber(stats.jatinhos)} subtitle="Frota Aérea" color="text-blue-400"/>
                    <StatCard icon={Server} title="Servidores AWS" value={formatNumber(stats.servidoresAWS)} subtitle="Meses de Infra Big Tech" color="text-yellow-400"/>
                 </div>
               </div>

               <div>
                  <SectionTitle icon={Landmark} title="Infraestrutura & Sociedade" />
                  <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-white/5">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white/5 text-slate-400">
                        <tr>
                          <th className="p-4 font-bold">Projeto Social / Obra</th>
                          <th className="p-4 font-bold text-right">Quantidade Possível</th>
                          <th className="p-4 font-bold hidden md:table-cell">Impacto</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-300">
                        <tr>
                          <td className="p-4 flex items-center gap-3"><HeartPulse className="w-4 h-4 text-emerald-400"/> Hospitais Alta Complexidade</td>
                          <td className="p-4 text-right font-mono font-bold text-emerald-300">{formatNumber(stats.hospitais)}</td>
                          <td className="p-4 hidden md:table-cell text-xs text-slate-500">Unidades com UTI e Cirurgia</td>
                        </tr>
                        <tr>
                          <td className="p-4 flex items-center gap-3"><GraduationCap className="w-4 h-4 text-yellow-400"/> Escolas Públicas Padrão</td>
                          <td className="p-4 text-right font-mono font-bold text-yellow-300">{formatNumber(stats.escolas)}</td>
                          <td className="p-4 hidden md:table-cell text-xs text-slate-500">Modelo FNDE 12 Salas</td>
                        </tr>
                        <tr>
                          <td className="p-4 flex items-center gap-3"><TrainFront className="w-4 h-4 text-blue-400"/> Ferrovia (Km)</td>
                          <td className="p-4 text-right font-mono font-bold text-blue-300">{formatNumber(stats.kmFerrovia)} km</td>
                          <td className="p-4 hidden md:table-cell text-xs text-slate-500">Malha ferroviária nova</td>
                        </tr>
                        <tr>
                          <td className="p-4 flex items-center gap-3"><Users className="w-4 h-4 text-orange-400"/> Salários Mínimos (Anual)</td>
                          <td className="p-4 text-right font-mono font-bold text-orange-300">{formatNumber(stats.salariosMinimos)}</td>
                          <td className="p-4 hidden md:table-cell text-xs text-slate-500">Pessoas sustentadas por 1 ano</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
               </div>

               <div>
                 <SectionTitle icon={Globe} title="Commodities & Ativos Globais" />
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-card p-4 text-center">
                      <Bitcoin className="w-8 h-8 mx-auto mb-2 text-orange-500"/>
                      <div className="text-xl font-bold">{formatNumber(stats.qtdBtc)}</div>
                      <div className="text-xs text-slate-500">BTC</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-400"/>
                      <div className="text-xl font-bold">{formatNumber(stats.qtdOuro)}</div>
                      <div className="text-xs text-slate-500">Toneladas de Ouro</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <Tractor className="w-8 h-8 mx-auto mb-2 text-green-500"/>
                      <div className="text-xl font-bold">{formatNumber(stats.qtdSoja)}</div>
                      <div className="text-xs text-slate-500">Sacas de Soja</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-400"/>
                      <div className="text-xl font-bold">{formatNumber(stats.acoesVale)}</div>
                      <div className="text-xs text-slate-500">Ações VALE3</div>
                    </div>
                 </div>
               </div>

            </div>
          )}

          {activeTab === 'investing' && (
            <div className="animate-fade-in pb-10">
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {['conservador', 'moderado', 'arrojado'].map((perfil) => (
                  <button
                    key={perfil}
                    onClick={() => setPerfilInvestidor(perfil)}
                    className={`p-4 rounded-xl border border-white/10 font-bold capitalize transition-all ${perfilInvestidor === perfil ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800'}`}
                  >
                    {perfil}
                    <span className="block text-[10px] uppercase font-normal mt-1 opacity-70">
                      {perfil === 'conservador' && 'CDI / Tesouro'}
                      {perfil === 'moderado' && 'Mix Carteira'}
                      {perfil === 'arrojado' && 'Ações & FIIs'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="glass-card p-6 rounded-2xl h-96 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-200 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-400"/> Evolução (30 Anos)
                  </h3>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                    Juros Compostos Reais (Desc. Inflação)
                  </span>
                </div>
                
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={projecaoInvestimento}>
                    <defs>
                      <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155"/>
                    <XAxis dataKey="ano" hide={true} />
                    <YAxis tickFormatter={(value) => `R$${(value/1000000).toFixed(0)}M`} style={{fontSize: '12px', fill: '#94a3b8'}}/>
                    <Tooltip 
                      contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc'}}
                      formatter={(value) => formatCurrency(value)}
                      labelStyle={{color: '#94a3b8'}}
                    />
                    <Area type="monotone" dataKey="saldo" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorSaldo)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="glass-card p-6 rounded-xl border-l-4 border-l-emerald-500">
                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Renda Passiva Mensal</h4>
                    <p className="text-3xl font-black text-white">
                      {perfilInvestidor === 'conservador' && formatCurrency(premioTotal * 0.0085)}
                      {perfilInvestidor === 'moderado' && formatCurrency(premioTotal * 0.0095)}
                      {perfilInvestidor === 'arrojado' && formatCurrency(premioTotal * 0.011)}
                    </p>
                    <p className="text-xs text-emerald-500/70 mt-2">*Valor líquido estimado para o 1º mês.</p>
                 </div>

                 <div className="glass-card p-6 rounded-xl border-l-4 border-l-orange-500">
                    <h4 className="text-orange-400 font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Alerta de Inflação</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Em 10 anos, seu custo de vida atual de <strong>{formatCurrency(gastoMensal)}</strong> subirá para cerca de <strong>{formatCurrency(gastoMensal * 1.75)}</strong> apenas para manter o mesmo conforto.
                    </p>
                 </div>
              </div>

            </div>
          )}

          {activeTab === 'curiosities' && (
            <div className="animate-fade-in pb-10">
              <SectionTitle icon={Dna} title="Curiosidades Avançadas" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CURIOSIDADES_AVANCADAS.map((curiosidade, index) => {
                  const IconMap = {
                    Tractor, TrainFront, Coins, Briefcase, Gamepad2, Clapperboard, 
                    Server, Car, HeartPulse, Megaphone, Users, Cone, Plane, Bitcoin, Landmark
                  };
                  const IconComponent = IconMap[curiosidade.icone] || Coins;

                  return (
                    <div key={index} className="glass-card p-5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-400">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-200 mb-1">{curiosidade.titulo}</h4>
                          <p className="text-sm text-white font-semibold mb-2">{curiosidade.desc}</p>
                          <p className="text-xs text-slate-500 leading-relaxed border-t border-white/5 pt-2">
                            {curiosidade.detalhe}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="animate-fade-in pb-10 max-w-3xl mx-auto space-y-6">
              <SectionTitle icon={ShieldCheck} title="Protocolo de Segurança do Ganhador" />
              
              <div className="glass-card p-6 border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500"/> Jogador Individual</h3>
                <ul className="space-y-3 text-slate-300 text-sm mt-4">
                  <li className="flex gap-3"><span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span> Assine o verso do bilhete imediatamente com nome e CPF. Isso torna o título intransferível.</li>
                  <li className="flex gap-3"><span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span> Não vá à lotérica. Prêmios acima de R$ 2.259,20 só são pagos em agências da CAIXA.</li>
                  <li className="flex gap-3"><span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span> Procure uma agência central, evite agências de bairro. Fale direto com o Gerente Geral.</li>
                  <li className="flex gap-3"><span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span> Mantenha silêncio absoluto. Delete redes sociais temporariamente.</li>
                </ul>
              </div>

              <div className="glass-card p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Users className="w-5 h-5 text-blue-500"/> Bolão Oficial</h3>
                <ul className="space-y-3 text-slate-300 text-sm mt-4">
                  <li className="flex gap-3"><span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span> Cada participante deve ter seu próprio recibo da cota original.</li>
                  <li className="flex gap-3"><span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span> A retirada é individual. Não é necessário que todos vão juntos ao banco.</li>
                  <li className="flex gap-3"><span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span> Leve RG, CPF e o Recibo da Cota em perfeito estado.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'generator' && (
            <div className="animate-fade-in pb-10 text-center">
               <SectionTitle icon={Ticket} title="Gerador de Probabilidade Quântica" />
               
               <div className="glass-card p-8 max-w-2xl mx-auto">
                 <div className="mb-8">
                   <label className="block text-slate-400 mb-4 font-bold">Quantidade de Números na Aposta</label>
                   <div className="flex justify-center gap-2 flex-wrap">
                     {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => (
                       <button
                        key={n}
                        onClick={() => setQtdDezenas(n)}
                        className={`w-10 h-10 rounded-lg font-bold transition-all ${qtdDezenas === n ? 'bg-emerald-500 text-white scale-110 shadow-lg' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                       >
                         {n}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div className="flex justify-center gap-3 mb-8 flex-wrap">
                   {numerosGerados.map((num) => (
                     <div key={num} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg animate-fade-in border-2 border-emerald-300/50">
                       {num}
                     </div>
                   ))}
                   {numerosGerados.length === 0 && (
                     <div className="text-slate-600 italic py-4">Clique abaixo para gerar sua sorte...</div>
                   )}
                 </div>

                 <button 
                  onClick={gerarNumeros}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                 >
                   <Shuffle className="w-5 h-5"/> Gerar Combinação Otimizada
                 </button>

                 <div className="mt-6 pt-6 border-t border-white/10">
                   <p className="text-slate-400 text-sm mb-1">Probabilidade Matemática Real</p>
                   <p className="text-2xl font-black text-white">{PROBABILIDADES[qtdDezenas]}</p>
                 </div>
               </div>
            </div>
          )}

        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-slate-600 text-xs md:text-sm">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p>© 2026 Developed by <span className="text-emerald-500 font-bold">Jiuk</span></p>
          <span className="hidden md:block">•</span>
          <p>Database Audit: <span className="font-mono text-slate-500">DEC/2025</span></p>
          <span className="hidden md:block">•</span>
          <p>Disclaimer: Simulador com fins educativos e de entretenimento.</p>
        </div>
      </footer>

    </div>
  );
}