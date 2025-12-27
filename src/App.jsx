/* ==========================================================================================
   DADOS DE MERCADO E MÉDIAS HISTÓRICAS (ATUALIZADO PARA 2025/2026)
   ========================================================================================== */
import React, { useState, useEffect } from 'react';
import { 
  Plane, Building2, Briefcase, Film, HeartPulse, GraduationCap, Coins, 
  TrendingUp, PiggyBank, BarChart3, AlertTriangle, Gamepad2, Smartphone, 
  Car, Fuel, Bitcoin, Globe, ShoppingBag, Megaphone, Clapperboard, BookOpen
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid 
} from 'recharts';

const MARKET_DATA = {
  // --- ENTRETENIMENTO & CULTURA ---
  custo_jogo_indie: 500000,        // R$ 500k
  custo_jogo_a: 15000000,          // R$ 15 Mi
  custo_jogo_aa: 80000000,         // R$ 80 Mi
  custo_jogo_aaa: 1200000000,      // R$ 1.2 Bi (Ex: GTA VI Budget est.)
  custo_filme_indie: 5000000,      // R$ 5 Mi
  custo_filme_blockbuster: 800000000, // R$ 800 Mi
  custo_serie_ep: 60000000,        // R$ 60 Mi (Episódio High-End)
  custo_publicar_livro: 50000,     // R$ 50k (Alta qualidade)

  // --- LUXO & CONSUMO ---
  preco_iphone: 15000,             // iPhone Pro Max Lançamento
  preco_supercarro: 4500000,       // Ferrari/Lamborghini média
  preco_jetski: 120000,            // Jetski Top
  preco_jatinho: 35000000,         // Jato Leve (Phenom 300 usado)
  preco_cesta_basica: 800,         // Média Nacional

  // --- ECONOMIA & MERCADO ---
  pib_brasil: 10900000000000,      // ~R$ 10.9 Trilhões
  acao_bluechip: 45,               // Preço médio (Vale/Petrobras mix)
  preco_gasolina: 6.10,            // Litro médio
  custo_ads_cpm: 15,               // Custo por 1000 impressões (Ads Premium)

  // --- MOEDAS & CRYPTO (Cotação Estimada) ---
  usd: 6.10,
  eur: 6.50,
  gbp: 7.40,
  jpy: 0.041,
  ars: 0.006, // Peso Arg
  krw: 0.0045, // Won Coreano
  btc: 580000, 
  eth: 22000,
  sol: 1100,

  // --- CUSTOS SOCIAIS ---
  custo_escola_publica: 3500000,   
  custo_hospital_medio: 40000000,
  pib_cidades_pequenas: 150000000, 
  
  // --- ÍNDICES FINANCEIROS ---
  taxa_cdi: 0.105,       
  taxa_ibov: 0.118,      
  inflacao_ipca: 0.058,  
};

const ESTADOS_BR = [
  { uf: 'SP', custo_imovel: 1500000 },
  { uf: 'RJ', custo_imovel: 1300000 },
  { uf: 'SC', custo_imovel: 1400000 },
  { uf: 'MG', custo_imovel: 900000 },
  { uf: 'DF', custo_imovel: 1800000 },
  { uf: 'Nordeste', custo_imovel: 850000 },
];

const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
const formatNumber = (num) => new Intl.NumberFormat('pt-BR').format(Math.floor(num));

/* ==========================================================================================
   COMPONENTE: CARD ESTATÍSTICO (ATUALIZADO COM DESIGN GLASS)
   ========================================================================================== */
const StatCard = ({ icon: Icon, title, value, subtitle, color = "text-emerald-400" }) => (
  <div className="glass-card p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all group">
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

/* ==========================================================================================
   COMPONENTE: SEÇÃO DE CONTEÚDO
   ========================================================================================== */
const SectionTitle = ({ icon: Icon, title }) => (
  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-200 mb-6 mt-10 border-b border-white/10 pb-2">
    <Icon className="w-5 h-5 text-emerald-400" /> {title}
  </h3>
);

/* ==========================================================================================
   COMPONENTE PRINCIPAL
   ========================================================================================== */
export default function MegaViradaSimulator() {
  const [activeTab, setActiveTab] = useState('spending'); 
  const [premioTotal, setPremioTotal] = useState(1000000000); 
  const [gastoMensal, setGastoMensal] = useState(50000);
  const [anosDuracao, setAnosDuracao] = useState(0);
  const [stats, setStats] = useState({});
  const [perfilInvestidor, setPerfilInvestidor] = useState('conservador'); 
  const [projecaoInvestimento, setProjecaoInvestimento] = useState([]);

  /* --- CÁLCULOS DE GASTOS E CURIOSIDADES --- */
  useEffect(() => {
    const gastoAnual = gastoMensal * 12;
    const tempoAnos = premioTotal / (gastoAnual || 1); 
    
    // Cálculo Gasolina (5% do Gasto Mensal)
    const orcamentoGasolina = gastoMensal * 0.05;
    const litrosGasolina = orcamentoGasolina / MARKET_DATA.preco_gasolina;
    // Autonomia: Média 10km/L a 60km/h
    const horasDirigindo = (litrosGasolina * 10) / 60; 

    setAnosDuracao(tempoAnos);

    setStats({
      // Entretenimento
      jogosIndie: premioTotal / MARKET_DATA.custo_jogo_indie,
      jogosAAA: premioTotal / MARKET_DATA.custo_jogo_aaa,
      filmesBlockbuster: premioTotal / MARKET_DATA.custo_filme_blockbuster,
      seriesEps: premioTotal / MARKET_DATA.custo_serie_ep,
      livros: premioTotal / MARKET_DATA.custo_publicar_livro,
      
      // Luxo
      iphones: premioTotal / MARKET_DATA.preco_iphone,
      supercarros: premioTotal / MARKET_DATA.preco_supercarro,
      jatinhos: premioTotal / MARKET_DATA.preco_jatinho,
      jetskis: premioTotal / MARKET_DATA.preco_jetski,
      
      // Economia
      pibBrasilPct: (premioTotal / MARKET_DATA.pib_brasil) * 100,
      acoesBluechip: premioTotal / MARKET_DATA.acao_bluechip,
      cestasBasicas: premioTotal / MARKET_DATA.preco_cesta_basica,
      
      // Marketing
      adsImpressions: (premioTotal / MARKET_DATA.custo_ads_cpm) * 1000,

      // Crypto
      qtdBtc: premioTotal / MARKET_DATA.btc,
      qtdEth: premioTotal / MARKET_DATA.eth,
      qtdSol: premioTotal / MARKET_DATA.sol,

      // Moedas
      totalUsd: premioTotal / MARKET_DATA.usd,
      totalEur: premioTotal / MARKET_DATA.eur,
      totalJpy: premioTotal / MARKET_DATA.jpy,
      totalKrw: premioTotal / MARKET_DATA.krw,

      // Gasolina Logic
      horasDirigindo: horasDirigindo,
      diasDirigindo: horasDirigindo / 24,

      // Impacto Social
      escolas: premioTotal / MARKET_DATA.custo_escola_publica,
      hospitais: premioTotal / MARKET_DATA.custo_hospital_medio,
      pibCidades: premioTotal / MARKET_DATA.pib_cidades_pequenas,
    });

  }, [premioTotal, gastoMensal]);

  /* --- CÁLCULOS DE INVESTIMENTO --- */
  useEffect(() => {
    let taxaRetornoAnual = 0;
    if (perfilInvestidor === 'conservador') taxaRetornoAnual = MARKET_DATA.taxa_cdi;
    else if (perfilInvestidor === 'moderado') taxaRetornoAnual = (MARKET_DATA.taxa_cdi * 0.6) + (MARKET_DATA.taxa_ibov * 0.4);
    else taxaRetornoAnual = MARKET_DATA.taxa_ibov;

    const taxaMensal = Math.pow(1 + taxaRetornoAnual, 1 / 12) - 1;
    const inflacaoMensal = Math.pow(1 + MARKET_DATA.inflacao_ipca, 1 / 12) - 1;

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

  /* ==========================================================================================
     RENDERIZAÇÃO (UI)
     ========================================================================================== */
  return (
    <div className="min-h-screen text-slate-200 p-4 md:p-8 pb-20">
      
      {/* HEADER GLITCH */}
      <header className="max-w-6xl mx-auto mb-10 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 glow-text tracking-tight">
          BARÃO DA VIRADA
        </h1>
        <p className="text-slate-400 font-mono text-sm md:text-base uppercase tracking-widest">
          Simulador de Patrimônio & Poder Econômico
        </p>
      </header>

      {/* CONTROLES MÓVEIS (TAB) */}
      <div className="max-w-xl mx-auto mb-10 glass-panel p-1 rounded-full flex relative z-10">
        <button 
          onClick={() => setActiveTab('spending')}
          className={`flex-1 py-3 px-6 rounded-full font-bold transition-all flex justify-center items-center gap-2 ${activeTab === 'spending' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white'}`}
        >
          <ShoppingBag className="w-4 h-4"/> Poder de Compra
        </button>
        <button 
          onClick={() => setActiveTab('investing')}
          className={`flex-1 py-3 px-6 rounded-full font-bold transition-all flex justify-center items-center gap-2 ${activeTab === 'investing' ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'text-slate-400 hover:text-white'}`}
        >
          <TrendingUp className="w-4 h-4"/> Rentabilidade
        </button>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* ======================= SIDEBAR DE CONFIGURAÇÃO ======================= */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-2xl neon-border">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
              <Coins className="w-5 h-5 text-emerald-400"/> Parâmetros
            </h2>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sua Fortuna (R$)</label>
              <input 
                type="number" 
                value={premioTotal}
                onChange={(e) => setPremioTotal(Number(e.target.value))}
                className="w-full p-4 bg-slate-900/50 rounded-xl border border-white/10 focus:border-emerald-500/50 outline-none text-emerald-400 font-mono font-bold text-xl"
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
                max="1000000" 
                step="5000"
                value={gastoMensal}
                onChange={(e) => setGastoMensal(Number(e.target.value))}
              />
            </div>
          </div>

          {/* CURIOSIDADE GASOLINA */}
          <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-orange-900/20 to-slate-900/50 border-orange-500/20">
             <h3 className="font-bold text-orange-400 mb-4 flex items-center gap-2 text-sm uppercase">
               <Fuel className="w-4 h-4"/> Curiosidade: Combustível
             </h3>
             <p className="text-sm text-slate-300 leading-relaxed mb-3">
               Se você gastasse apenas <strong>5%</strong> do seu orçamento mensal ({formatCurrency(gastoMensal * 0.05)}) em gasolina:
             </p>
             <div className="flex items-center gap-3">
                <div className="text-3xl font-black text-white">{formatNumber(stats.diasDirigindo)}</div>
                <div className="text-xs text-slate-500 uppercase font-bold">Dias seguidos<br/>dirigindo sem parar</div>
             </div>
          </div>
        </div>

        {/* ======================= ÁREA PRINCIPAL ======================= */}
        <div className="lg:col-span-8">
          
          {/* -------------------- ABA: PODER DE COMPRA -------------------- */}
          {activeTab === 'spending' && (
            <div className="animate-fade-in pb-10">
               
               {/* TEMPO DE VIDA DO DINHEIRO */}
               <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between mb-8 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10">
                   <p className="text-red-400 font-bold uppercase text-xs tracking-wider mb-2">Modo: Dinheiro no Colchão</p>
                   <h2 className="text-5xl md:text-6xl font-black text-white mb-2">{formatNumber(anosDuracao)} <span className="text-2xl text-slate-500">Anos</span></h2>
                   <p className="text-slate-400 text-sm">Tempo até a falência total sem investir nada.</p>
                 </div>
                 <PiggyBank className="w-24 h-24 text-red-500/20 md:text-red-500/10 absolute right-4 md:relative rotate-12"/>
               </div>

               {/* SEÇÃO ENTRETENIMENTO */}
               <SectionTitle icon={Gamepad2} title="Indústria do Entretenimento" />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard icon={Gamepad2} title="Jogos Indie" value={formatNumber(stats.jogosIndie)} subtitle="Estúdios Completos (R$ 500k cada)" color="text-purple-400"/>
                  <StatCard icon={Gamepad2} title="Jogos AAA" value={formatNumber(stats.jogosAAA)} subtitle="Nível GTA VI (R$ 1.2Bi)" color="text-purple-400"/>
                  <StatCard icon={Clapperboard} title="Filmes Blockbuster" value={formatNumber(stats.filmesBlockbuster)} subtitle="Nível Hollywood (R$ 800Mi)" color="text-red-400"/>
                  <StatCard icon={Film} title="Episódios de Série" value={formatNumber(stats.seriesEps)} subtitle="Nível HBO/Netflix (R$ 60Mi/ep)" color="text-red-400"/>
                  <StatCard icon={BookOpen} title="Livros Publicados" value={formatNumber(stats.livros)} subtitle="Best-sellers mundiais" color="text-yellow-400"/>
               </div>

               {/* SEÇÃO LUXO & TECH */}
               <SectionTitle icon={Smartphone} title="Luxo, Tech e Transporte" />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard icon={Smartphone} title="iPhones 16 Pro Max" value={formatNumber(stats.iphones)} subtitle="Modelo Topo de Linha" color="text-gray-200"/>
                  <StatCard icon={Car} title="Supercarros" value={formatNumber(stats.supercarros)} subtitle="Ferrari/Lambo (R$ 4.5Mi)" color="text-orange-400"/>
                  <StatCard icon={Plane} title="Jatinhos Particulares" value={formatNumber(stats.jatinhos)} subtitle="Embraer Phenom (Usado)" color="text-blue-400"/>
                  <StatCard icon={Briefcase} title="Empresas S.A." value={formatNumber(stats.acoesBluechip)} subtitle="Ações (Vale/Petrobras)" color="text-green-400"/>
               </div>

               {/* SEÇÃO CRYPTO & GLOBAL */}
               <SectionTitle icon={Bitcoin} title="Cripto & Moedas Globais" />
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-orange-500/20 text-center">
                    <Bitcoin className="w-8 h-8 text-orange-500 mx-auto mb-2"/>
                    <div className="text-lg font-bold text-white">{formatNumber(stats.qtdBtc)}</div>
                    <div className="text-xs text-slate-500">Bitcoins Inteiros</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-indigo-500/20 text-center">
                    <div className="text-indigo-400 font-black text-2xl mb-1">Ξ</div>
                    <div className="text-lg font-bold text-white">{formatNumber(stats.qtdEth)}</div>
                    <div className="text-xs text-slate-500">Ethereums</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-cyan-500/20 text-center">
                    <div className="text-cyan-400 font-black text-2xl mb-1">◎</div>
                    <div className="text-lg font-bold text-white">{formatNumber(stats.qtdSol)}</div>
                    <div className="text-xs text-slate-500">Solanas</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-emerald-500/20 text-center">
                    <Globe className="w-8 h-8 text-emerald-500 mx-auto mb-2"/>
                    <div className="text-lg font-bold text-white">{formatCurrency(stats.totalUsd).replace('R$', '$')}</div>
                    <div className="text-xs text-slate-500">Em Dólares (USD)</div>
                  </div>
               </div>

               {/* SEÇÃO IMPACTO & MARKET */}
               <SectionTitle icon={Megaphone} title="Impacto e Escala" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="glass-card p-6 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-slate-400 text-sm">Cestas Básicas</h4>
                      <div className="text-3xl font-bold text-white">{formatNumber(stats.cestasBasicas)}</div>
                      <p className="text-xs text-emerald-500 mt-1">Famílias alimentadas por 1 mês</p>
                    </div>
                    <HeartPulse className="w-10 h-10 text-emerald-500/50"/>
                 </div>
                 <div className="glass-card p-6 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-slate-400 text-sm">Tráfego Pago (Ads)</h4>
                      <div className="text-3xl font-bold text-white">{formatNumber(stats.adsImpressions / 1000000)}M</div>
                      <p className="text-xs text-blue-500 mt-1">Milhões de Visualizações (Impressões)</p>
                    </div>
                    <Megaphone className="w-10 h-10 text-blue-500/50"/>
                 </div>
                 <div className="glass-card p-6 rounded-xl col-span-1 md:col-span-2 border border-yellow-500/20 bg-yellow-900/10">
                    <h4 className="text-yellow-500 font-bold mb-2 flex items-center gap-2">
                       <TrendingUp className="w-4 h-4"/> Participação no PIB Brasileiro
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Sua fortuna representa <strong className="text-white text-lg">{stats.pibBrasilPct?.toFixed(6)}%</strong> de toda a riqueza produzida pelo Brasil em um ano.
                    </p>
                 </div>
               </div>

            </div>
          )}

          {/* -------------------- ABA: INVESTIMENTOS -------------------- */}
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
                      {perfil === 'conservador' && 'CDI (Renda Fixa)'}
                      {perfil === 'moderado' && 'Mix Carteira'}
                      {perfil === 'arrojado' && 'Ações & FIIs'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="glass-card p-6 rounded-2xl h-96 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-200 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-400"/> Evolução Patrimonial (30 Anos)
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

        </div>
      </main>
    </div>
  );
}