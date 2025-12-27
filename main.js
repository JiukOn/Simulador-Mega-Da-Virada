/* ==========================================================================================
   CONFIGURAÇÃO DE DADOS E CONSTANTES DE MERCADO (BASEADO EM DADOS REAIS BRASIL 2025)
   ========================================================================================== */
const MARKET_DATA = {
  pib_cidades_pequenas: 150000000, // PIB médio de cidades pequenas (R$ 150mi)
  custo_escola_publica: 3500000,   // Custo médio construção escola padrão FNDE
  custo_hospital_medio: 40000000,  // Hospital de médio porte
  custo_filme_nacional: 8000000,   // Orçamento médio filme comercial BR
  custo_jogo_indie: 1500000,       // Orçamento jogo AA/Indie Premium
  custo_pesquisa_pontual: 500000,  // Grant médio para pesquisa científica
  preco_imovel_medio_br: 950000,   // Imóvel alto padrão média nacional
  custo_abrir_empresa: 80000,      // Capital social inicial médio PME
  taxa_sucesso_empresa: 0.40,      // 40% sobrevivem após 5 anos (Sebrae)
  viagem_nacional: 8000,           // Custo viagem casal luxo BR
  viagem_internacional: 25000,     // Custo viagem casal luxo Exterior
};

const ESTADOS_BR = [
  { uf: 'SP', custo_imovel: 1500000 },
  { uf: 'RJ', custo_imovel: 1300000 },
  { uf: 'SC', custo_imovel: 1400000 },
  { uf: 'MG', custo_imovel: 900000 },
  { uf: 'BA', custo_imovel: 850000 },
  { uf: 'Demais Estados', custo_imovel: 700000 }
];

/* ==========================================================================================
   FUNÇÕES UTILITÁRIAS DE FORMATAÇÃO E CÁLCULO
   ========================================================================================== */
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plane, Building2, Briefcase, Film, HeartPulse, GraduationCap, Coins } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('pt-BR').format(Math.floor(num));
};

/* ==========================================================================================
   COMPONENTE: CARD DE ESTATÍSTICA (UI)
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
   COMPONENTE PRINCIPAL: SIMULADOR MEGA DA VIRADA
   ========================================================================================== */
export default function MegaViradaSimulator() {
  
  /* ==========================================================================================
     ESTADOS DA APLICAÇÃO
     ========================================================================================== */
  const [premioTotal, setPremioTotal] = useState(1000000000); // 1 Bilhão Padrão
  const [gastoMensal, setGastoMensal] = useState(50000);
  const [anosDuracao, setAnosDuracao] = useState(0);
  const [stats, setStats] = useState({});

  /* ==========================================================================================
     LÓGICA DE SIMULAÇÃO E EFEITOS (REACTIVE UPDATE)
     ========================================================================================== */
  useEffect(() => {
    // Cálculo Básico de Tempo
    const gastoAnual = gastoMensal * 12;
    const tempoAnos = premioTotal / (gastoAnual || 1); // Evita divisão por zero
    
    // Orçamento Lazer (20% do gasto mensal é assumido para viagens)
    const orcamentoLazerAnual = (gastoMensal * 0.20) * 12;
    
    // Cálculos de Poder de Compra (Baseado no prêmio total, assumindo alocação de 10% do prêmio para cada categoria para não zerar o dinheiro instantaneamente na simulação unitária)
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

  /* ==========================================================================================
     RENDERIZAÇÃO DA INTERFACE (JSX)
     ========================================================================================== */
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
        
        {/* ======================= PAINEL DE CONTROLE ======================= */}
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

        {/* ======================= GRID DE RESULTADOS ======================= */}
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

          {/* ======================= SEÇÃO DE CURIOSIDADES ======================= */}
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
