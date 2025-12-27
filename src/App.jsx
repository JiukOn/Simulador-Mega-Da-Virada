/* ==========================================================================================
   IMPORTAÇÕES E DADOS
   ========================================================================================== */
import React, { useState, useEffect } from 'react';
import { Plane, Building2, Briefcase, Film, HeartPulse, GraduationCap, Coins } from 'lucide-react';

const MARKET_DATA = {
  pib_cidades_pequenas: 150000000, 
  custo_escola_publica: 3500000,   
  custo_hospital_medio: 40000000,  
  custo_filme_nacional: 8000000,   
  custo_jogo_indie: 1500000,       
  custo_pesquisa_pontual: 500000,  
  preco_imovel_medio_br: 950000,   
  custo_abrir_empresa: 80000,      
  taxa_sucesso_empresa: 0.40,      
  viagem_nacional: 8000,           
  viagem_internacional: 25000,     
};

const ESTADOS_BR = [
  { uf: 'SP', custo_imovel: 1500000 },
  { uf: 'RJ', custo_imovel: 1300000 },
  { uf: 'SC', custo_imovel: 1400000 },
  { uf: 'MG', custo_imovel: 900000 },
  { uf: 'BA', custo_imovel: 850000 },
  { uf: 'Demais Estados', custo_imovel: 700000 }
];

const formatNumber = (num) => {
  return new Intl.NumberFormat('pt-BR').format(Math.floor(num));
};

/* ==========================================================================================
   COMPONENTES UI
   ========================================================================================== */
const StatCard = ({ icon: Icon, title, value, subtitle, color = "bg-blue-600" }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Estimativa</span>
    </div>
    <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
    <p className="text-gray-600 font-medium mb-2">{title}</p>
    <p className="text-xs text-gray-400 border-t pt-2 mt-2">{subtitle}</p>
  </div>
);

/* ==========================================================================================
   COMPONENTE PRINCIPAL
   ========================================================================================== */
export default function MegaViradaSimulator() {
  const [premioTotal, setPremioTotal] = useState(1000000000); 
  const [gastoMensal, setGastoMensal] = useState(50000);
  const [anosDuracao, setAnosDuracao] = useState(0);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const gastoAnual = gastoMensal * 12;
    const tempoAnos = premioTotal / (gastoAnual || 1); 
    const orcamentoLazerAnual = (gastoMensal * 0.20) * 12;
    const capitalInvestimento = premioTotal; 

    setAnosDuracao(tempoAnos);

    setStats({
      viagensNacionais: orcamentoLazerAnual / MARKET_DATA.viagem_nacional,
      viagensInternacionais: orcamentoLazerAnual / MARKET_DATA.viagem_internacional,
      escolas: capitalInvestimento / MARKET_DATA.custo_escola_publica,
      hospitais: capitalInvestimento / MARKET_DATA.custo_hospital_medio,
      filmes: capitalInvestimento / MARKET_DATA.custo_filme_nacional,
      empresasAbertas: capitalInvestimento / MARKET_DATA.custo_abrir_empresa,
      empresasLucro: (capitalInvestimento / MARKET_DATA.custo_abrir_empresa) * MARKET_DATA.taxa_sucesso_empresa,
      pibCidades: capitalInvestimento / MARKET_DATA.pib_cidades_pequenas
    });

  }, [premioTotal, gastoMensal]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-8">
      
      <header className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-4">
          SIMULADOR MEGA 2026
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Descubra o poder do seu prêmio. Quanto tempo dura e o impacto que você causaria no Brasil.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-emerald-500">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-500"/> Parâmetros Financeiros
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Prêmio (R$)</label>
              <input 
                type="number" 
                value={premioTotal}
                onChange={(e) => setPremioTotal(Number(e.target.value))}
                className="w-full p-3 bg-slate-100 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-700 font-mono font-bold text-lg"
              />
              <p className="text-xs text-slate-400 mt-1">Estimativa Mega da Virada: 600M - 1B</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Seu Custo de Vida Mensal (R$)</label>
              <input 
                type="range" 
                min="5000" 
                max="1000000" 
                step="5000"
                value={gastoMensal}
                onChange={(e) => setGastoMensal(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-3"
              />
              <input 
                type="number" 
                value={gastoMensal}
                onChange={(e) => setGastoMensal(Number(e.target.value))}
                className="w-full p-3 bg-slate-100 rounded-lg border border-slate-200 font-mono text-lg"
              />
            </div>

            <div className="bg-emerald-900 text-white p-4 rounded-xl text-center mt-8">
              <p className="text-sm opacity-80 mb-1">Seu dinheiro acabaria em:</p>
              <div className="text-4xl font-black">{formatNumber(anosDuracao)} Anos</div>
              <p className="text-xs opacity-60 mt-2">Sem considerar rendimentos (apenas saque)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
             <h3 className="font-bold text-gray-700 mb-4">Poder Imobiliário (Casas por Estado)</h3>
             <div className="space-y-3">
                {ESTADOS_BR.map((estado) => (
                  <div key={estado.uf} className="flex justify-between items-center text-sm border-b pb-2">
                    <span className="font-semibold text-gray-600">{estado.uf}</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md font-mono">
                      {formatNumber(premioTotal / estado.custo_imovel)} un.
                    </span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            
            <StatCard 
              icon={Plane}
              title="Viagens Internacionais / Ano"
              value={formatNumber(stats.viagensInternacionais)}
              subtitle="Considerando 20% do orçamento mensal para lazer"
              color="bg-sky-500"
            />

            <StatCard 
              icon={Briefcase}
              title="Empresas Lucrativas"
              value={formatNumber(stats.empresasLucro)}
              subtitle={`De ${formatNumber(stats.empresasAbertas)} abertas durante a vida`}
              color="bg-indigo-600"
            />

            <StatCard 
              icon={Film}
              title="Filmes Patrocinados"
              value={formatNumber(stats.filmes)}
              subtitle="Blockbusters nacionais totalmente financiados"
              color="bg-purple-600"
            />

            <StatCard 
              icon={GraduationCap}
              title="Escolas Públicas"
              value={formatNumber(stats.escolas)}
              subtitle="Unidades completas construídas e equipadas"
              color="bg-yellow-500"
            />

             <StatCard 
              icon={HeartPulse}
              title="Hospitais de Médio Porte"
              value={formatNumber(stats.hospitais)}
              subtitle="Estruturas completas para o SUS"
              color="bg-rose-500"
            />

            <StatCard 
              icon={Building2}
              title="Cidades com PIB menor"
              value={`${formatNumber(stats.pibCidades)}x`}
              subtitle="Quantas cidades você 'compraria' com sua fortuna"
              color="bg-slate-600"
            />
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-yellow-400">★</span> Curiosidades do Bilionário
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <div className="min-w-2 h-2 mt-2 bg-emerald-500 rounded-full"></div>
                <p>Se você gastasse <strong>R$ 1 por segundo</strong> sem parar, levaria <strong>{formatNumber(premioTotal / (60*60*24*365))} anos</strong> para gastar tudo.</p>
              </li>
              <li className="flex gap-3">
                <div className="min-w-2 h-2 mt-2 bg-emerald-500 rounded-full"></div>
                <p>Você poderia financiar <strong>{formatNumber(premioTotal / MARKET_DATA.custo_pesquisa_pontual)}</strong> projetos avançados de pesquisa científica no Brasil.</p>
              </li>
               <li className="flex gap-3">
                <div className="min-w-2 h-2 mt-2 bg-emerald-500 rounded-full"></div>
                <p>Empilhando notas de R$ 100, sua fortuna alcançaria a altura de <strong>{formatNumber((premioTotal / 100) * 0.0001)} km</strong>.</p>
              </li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}