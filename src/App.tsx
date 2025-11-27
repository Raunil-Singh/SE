import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Zap, Eye, Shield, Code, FileText, Activity } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('architecture');
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showVulnerability, setShowVulnerability] = useState(false);

  const sampleContract = `pragma solidity ^0.8.0;

contract VulnerableBank {
    mapping(address => uint) balances;
    
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount);
        // VULNERABILITY: Reentrancy attack possible
        msg.sender.call{value: amount}("");
        balances[msg.sender] -= amount;
    }
}`;

  const architectureLayers = [
    {
      id: 1,
      name: "Layer 4: Integration & Presentation",
      color: "bg-purple-500",
      components: ["Web Dashboard", "IDE Plugins", "CLI Tools", "API Gateway"],
      description: "User interfaces and external system integration points"
    },
    {
      id: 2,
      name: "Layer 3: Explainability & Interpretation",
      color: "bg-blue-500",
      components: ["Attention Visualization", "NLG Module", "Feature Attribution", "Counterfactual Generator"],
      description: "Converts AI predictions into human-understandable explanations"
    },
    {
      id: 3,
      name: "Layer 2: AI Analysis Engine",
      color: "bg-green-500",
      components: ["Dual-Channel GNN", "Preprocessing Pipeline", "Model Serving", "Knowledge Base"],
      description: "Core AI-driven vulnerability detection using graph neural networks"
    },
    {
      id: 4,
      name: "Layer 1: Data Acquisition & Storage",
      color: "bg-orange-500",
      components: ["Contract Repository", "Analysis History", "Vulnerability DB", "Model Store"],
      description: "Data management and persistent storage foundation"
    }
  ];

  const analysisSteps = [
    { step: 1, name: "Input Acquisition", icon: Code, description: "Contract submitted via IDE/API" },
    { step: 2, name: "Preprocessing", icon: Activity, description: "Parse code, build AST, CFG, DFG" },
    { step: 3, name: "Graph Construction", icon: Zap, description: "Create hybrid code graph" },
    { step: 4, name: "AI Analysis", icon: Shield, description: "Dual-channel GNN processes graph" },
    { step: 5, name: "Explainability", icon: Eye, description: "Generate SHAP attributions" },
    { step: 6, name: "Report Synthesis", icon: FileText, description: "Create actionable reports" }
  ];

  const vulnerabilityReport = {
    type: "Reentrancy Vulnerability",
    severity: "Critical",
    location: "Line 8: msg.sender.call",
    confidence: "95%",
    explanation: "The contract sends ETH before updating the balance, allowing recursive calls to drain funds.",
    remediation: "Update balance BEFORE external call, or use ReentrancyGuard modifier",
    codeHighlight: [8]
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <h1 className="text-3xl font-bold mb-2">AI-Driven Smart Contract Security Framework</h1>
        <p className="text-purple-100">Interactive Demonstration of Explainable AI Architecture</p>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-6 py-3 font-semibold ${activeTab === 'architecture' ? 'bg-gray-800 border-b-2 border-purple-500' : 'hover:bg-gray-800'}`}
        >
          Architecture Overview
        </button>
        <button
          onClick={() => setActiveTab('workflow')}
          className={`px-6 py-3 font-semibold ${activeTab === 'workflow' ? 'bg-gray-800 border-b-2 border-purple-500' : 'hover:bg-gray-800'}`}
        >
          Analysis Workflow
        </button>
        <button
          onClick={() => setActiveTab('demo')}
          className={`px-6 py-3 font-semibold ${activeTab === 'demo' ? 'bg-gray-800 border-b-2 border-purple-500' : 'hover:bg-gray-800'}`}
        >
          Live Demo
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'architecture' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Layered Architecture Model</h2>
            <p className="text-gray-300 mb-6">Click on any layer to explore its components</p>
            
            <div className="space-y-4">
              {architectureLayers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id === selectedLayer ? null : layer.id)}
                  className={`${layer.color} bg-opacity-20 border-2 ${layer.color.replace('bg-', 'border-')} rounded-lg p-4 cursor-pointer hover:bg-opacity-30 transition-all`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">{layer.name}</h3>
                      <p className="text-gray-300 text-sm mt-1">{layer.description}</p>
                    </div>
                    <div className={`text-2xl transform transition-transform ${selectedLayer === layer.id ? 'rotate-90' : ''}`}>
                      →
                    </div>
                  </div>
                  
                  {selectedLayer === layer.id && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {layer.components.map((component, idx) => (
                        <div key={idx} className="bg-gray-800 rounded p-3 text-center">
                          <p className="text-sm font-semibold">{component}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Key Architectural Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Modularity</p>
                    <p className="text-sm text-gray-400">Independent component development</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Explainability by Design</p>
                    <p className="text-sm text-gray-400">Transparency built into every layer</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Security-First</p>
                    <p className="text-sm text-gray-400">Defense-in-depth protection</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Developer-Centric</p>
                    <p className="text-sm text-gray-400">Seamless SDLC integration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">7-Stage Analysis Workflow</h2>
            <p className="text-gray-300 mb-6">Step through the complete analysis process</p>

            <div className="flex justify-center mb-8">
              <div className="flex space-x-2">
                {analysisSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAnalysisStep(idx)}
                    className={`px-4 py-2 rounded ${analysisStep === idx ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    Step {step.step}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                {React.createElement(analysisSteps[analysisStep].icon, {
                  size: 48,
                  className: "text-purple-400"
                })}
                <div>
                  <h3 className="text-2xl font-bold">{analysisSteps[analysisStep].name}</h3>
                  <p className="text-gray-400">{analysisSteps[analysisStep].description}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {analysisStep === 0 && (
                  <div className="space-y-3">
                    <p className="text-gray-300">Contract enters through multiple entry points:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-700 p-3 rounded">📤 Direct File Upload</div>
                      <div className="bg-gray-700 p-3 rounded">🔌 API Submission</div>
                      <div className="bg-gray-700 p-3 rounded">💻 IDE Integration</div>
                      <div className="bg-gray-700 p-3 rounded">🔍 Blockchain Explorer</div>
                    </div>
                  </div>
                )}
                
                {analysisStep === 1 && (
                  <div className="space-y-3">
                    <p className="text-gray-300">Raw code transformed into multiple representations:</p>
                    <div className="bg-gray-700 p-4 rounded space-y-2">
                      <p>• <span className="text-blue-400">AST</span> - Abstract Syntax Tree</p>
                      <p>• <span className="text-green-400">CFG</span> - Control Flow Graph</p>
                      <p>• <span className="text-yellow-400">DFG</span> - Data Flow Graph</p>
                      <p className="text-sm text-gray-400 mt-2">Normalizes syntax, resolves imports, flattens inheritance</p>
                    </div>
                  </div>
                )}

                {analysisStep === 2 && (
                  <div className="space-y-3">
                    <p className="text-gray-300">Unified hybrid code graph combines all representations:</p>
                    <div className="bg-gray-700 p-4 rounded">
                      <p className="mb-2">Graph Components:</p>
                      <p>• <strong>Nodes:</strong> Statements, variables, functions</p>
                      <p>• <strong>Edges:</strong> Syntactic, control flow, data dependencies</p>
                      <p className="text-sm text-gray-400 mt-2">Enriched with types, signatures, external calls</p>
                    </div>
                  </div>
                )}

                {analysisStep === 3 && (
                  <div className="space-y-3">
                    <p className="text-gray-300">Dual-channel architecture processes the graph:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-4 rounded">
                        <p className="font-bold mb-2">Structural Channel</p>
                        <p className="text-sm">Graph Neural Networks analyze topology and patterns</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-900 to-green-700 p-4 rounded">
                        <p className="font-bold mb-2">Semantic Channel</p>
                        <p className="text-sm">Transformer models capture contextual meaning</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 text-center">Cross-modal attention fuses both channels</p>
                  </div>
                )}

                {analysisStep === 4 && (
                  <div className="space-y-3">
                    <p className="text-gray-300">Generate multi-level explanations:</p>
                    <div className="bg-gray-700 p-4 rounded space-y-2">
                      <p>• <strong>SHAP Attribution:</strong> Which features influenced the decision</p>
                      <p>• <strong>Attention Weights:</strong> Which code lines matter most</p>
                      <p>• <strong>Natural Language:</strong> Human-readable descriptions</p>
                      <p>• <strong>Counterfactuals:</strong> Minimal changes to fix vulnerabilities</p>
                    </div>
                  </div>
                )}

                {analysisStep === 5 && (
                  <div className="space-y-3">
                    <p className="text-gray-300">Tailored reports for different stakeholders:</p>
                    <div className="space-y-2">
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="font-bold">👨‍💻 Developers:</p>
                        <p className="text-sm text-gray-400">Detailed vulnerability descriptions with code fixes</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="font-bold">🔍 Auditors:</p>
                        <p className="text-sm text-gray-400">Technical details, attack vectors, severity ratings</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="font-bold">📊 Managers:</p>
                        <p className="text-sm text-gray-400">High-level risk assessments and action items</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setAnalysisStep(Math.max(0, analysisStep - 1))}
                  disabled={analysisStep === 0}
                  className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setAnalysisStep(Math.min(analysisSteps.length - 1, analysisStep + 1))}
                  disabled={analysisStep === analysisSteps.length - 1}
                  className="px-4 py-2 bg-purple-600 rounded disabled:opacity-50 hover:bg-purple-700"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demo' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Live Vulnerability Detection Demo</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Editor */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Smart Contract Code</h3>
                <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                  {sampleContract.split('\n').map((line, idx) => (
                    <div
                      key={idx}
                      className={`${
                        showVulnerability && vulnerabilityReport.codeHighlight.includes(idx + 1)
                          ? 'bg-red-900 bg-opacity-50 border-l-4 border-red-500 pl-2'
                          : ''
                      }`}
                    >
                      <span className="text-gray-500 mr-4">{idx + 1}</span>
                      <span className={line.includes('//') ? 'text-green-400' : 'text-gray-300'}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowVulnerability(!showVulnerability)}
                  className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center space-x-2"
                >
                  <Shield size={20} />
                  <span>{showVulnerability ? 'Hide Analysis' : 'Analyze Contract'}</span>
                </button>
              </div>

              {/* Results Panel */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
                {!showVulnerability ? (
                  <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
                    <Shield size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Click "Analyze Contract" to see results</p>
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="text-red-400 mt-1" size={24} />
                      <div>
                        <h4 className="text-xl font-bold text-red-400">{vulnerabilityReport.type}</h4>
                        <div className="flex space-x-2 mt-2">
                          <span className="px-3 py-1 bg-red-600 rounded-full text-xs">
                            {vulnerabilityReport.severity}
                          </span>
                          <span className="px-3 py-1 bg-blue-600 rounded-full text-xs">
                            Confidence: {vulnerabilityReport.confidence}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <p className="font-semibold mb-1">Location:</p>
                      <p className="text-sm text-gray-400">{vulnerabilityReport.location}</p>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <p className="font-semibold mb-1">Explanation:</p>
                      <p className="text-sm text-gray-400">{vulnerabilityReport.explanation}</p>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <p className="font-semibold mb-1 flex items-center">
                        <CheckCircle className="text-green-400 mr-2" size={18} />
                        Recommended Fix:
                      </p>
                      <div className="bg-gray-900 p-3 rounded mt-2">
                        <code className="text-sm text-green-400">{vulnerabilityReport.remediation}</code>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <p className="font-semibold mb-2">Explainability Features:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-700 p-2 rounded">✓ SHAP Attribution</div>
                        <div className="bg-gray-700 p-2 rounded">✓ Attention Weights</div>
                        <div className="bg-gray-700 p-2 rounded">✓ Code Highlighting</div>
                        <div className="bg-gray-700 p-2 rounded">✓ Counterfactual</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Eye className="mr-2" size={20} />
                Why This Matters
              </h4>
              <p className="text-sm text-gray-300">
                Traditional tools would simply flag this as a vulnerability. Our explainable AI framework provides:
                <strong> exact location</strong>, <strong>clear explanation</strong>, <strong>actionable fixes</strong>, 
                and <strong>confidence scores</strong> - helping developers understand and trust the analysis.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 p-4 mt-8">
        <p className="text-center text-gray-400 text-sm">
          Demo based on: "System Design and Architectural Framework for Explainable AI-Driven Smart Contract Security Analysis: Part II"
        </p>
      </div>
    </div>
  );
};

export default App;
