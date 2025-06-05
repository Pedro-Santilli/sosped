# 🚑 SOSPed Bot

## Sobre o Projeto

O **SOSPed Bot** é um assistente virtual de emergências médicas para WhatsApp que fornece orientações médicas de emergência e localização de hospitais próximos. O bot utiliza inteligência artificial para oferecer suporte em situações críticas, orientações passo a passo e informações sobre unidades de saúde na região do usuário.

## ✨ Funcionalidades

### 🎯 Orientações de Emergência
- **Assistência em emergências médicas** com classificação por níveis de gravidade
- **Instruções passo a passo** para situações de risco
- **Orientações claras e precisas** sem uso de termos técnicos desnecessários
- **Classificação automática** entre emergências intermediárias 🔶 e graves 🔴

### 📍 Localização de Hospitais
- **Busca automática** de hospitais próximos baseada na localização do usuário
- **Informações em tempo real** sobre unidades de saúde abertas
- **Cálculo de distância** e direções para os hospitais mais próximos
- **Filtro por horário de funcionamento** atual

### 🎤 Suporte Multimídia
- **Transcrição de áudio** para texto usando Whisper (Groq)
- **Resposta em áudio** usando Google Text-to-Speech
- **Processamento de localização** via coordenadas GPS
- **Interface conversacional** natural

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **whatsapp-web.js** - Integração com WhatsApp Web
- **Groq API** - IA para respostas médicas e transcrição de áudio
- **Google Text-to-Speech** - Síntese de voz
- **Geoapify API** - Geolocalização e busca de hospitais
- **Axios** - Cliente HTTP para APIs
- **Puppeteer** - Automação do navegador para WhatsApp Web

## 📋 Pré-requisitos

- Node.js v18+ instalado
- Conta no [Groq](https://groq.com/) para API de IA
- Conta no [Google Cloud](https://cloud.google.com/) para Text-to-Speech
- Conta no [Geoapify](https://www.geoapify.com/) para geolocalização
- WhatsApp ativo para escaneamento do QR Code

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/Pedro-Santilli/sosped/
cd sosped-bot
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# API Keys necessárias
GROQ_API_KEY=sua_chave_groq_aqui
GEMINI_API_KEY=sua_chave_google_tts_aqui
GEOAPIFY_API_KEY=sua_chave_geoapify_aqui
```

### 4. Execute o projeto
```bash
npm start
```

### 5. Escaneie o QR Code
- Abra o WhatsApp no seu celular
- Vá em **Dispositivos Conectados** > **Conectar um dispositivo**
- Escaneie o QR Code que aparecerá no terminal

## ⚙️ Configuração das APIs

### Groq API (IA e Speech-to-Text)
1. Acesse [groq.com](https://groq.com/)
2. Crie uma conta e obtenha sua API key
3. Adicione a chave no arquivo `.env` como `GROQ_API_KEY`

### Google Text-to-Speech
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Ative a API Text-to-Speech
3. Crie uma chave de API
4. Adicione a chave no arquivo `.env` como `GEMINI_API_KEY`

### Geoapify (Geolocalização)
1. Acesse [geoapify.com](https://www.geoapify.com/)
2. Crie uma conta gratuita
3. Obtenha sua API key
4. Adicione a chave no arquivo `.env` como `GEOAPIFY_API_KEY`

## 📁 Estrutura do Projeto

```
sosped-bot/
├── handlers/                 # Processadores de diferentes tipos de mensagem
│   ├── messageAudio.js      # Processamento de áudios
│   ├── messageLocation.js   # Processamento de localização
│   ├── messageOthers.js     # Tipos não suportados
│   └── messageText.js       # Processamento de texto
├── services/                # Serviços externos
│   ├── aiService.js         # Integração com Groq IA
│   ├── locationService.js   # Busca de hospitais (Geoapify)
│   ├── sttService.js        # Speech-to-Text (Groq Whisper)
│   └── ttsService.js        # Text-to-Speech (Google)
├── prompts/                 # Templates de prompts para IA
│   └── prompts.js           # Prompts de emergência e localização
├── utils/                   # Utilitários
│   └── logger.js            # Sistema de logs
├── teste/                   # Arquivos de teste
│   └── audio-exemplo.wav    # Áudio de exemplo
├── .env                     # Variáveis de ambiente (criar)
├── index.js                 # Arquivo principal
├── package.json             # Dependências do projeto
└── README.md                # Documentação
```

## 🎯 Como Usar

### Para Usuários do WhatsApp

1. **Emergências Médicas**: Envie uma mensagem descrevendo a situação de emergência
   - Exemplo: *"Pessoa desmaiou e não responde"*

2. **Localização de Hospitais**: Compartilhe sua localização atual
   - O bot retornará os hospitais mais próximos que estão abertos

3. **Mensagens de Áudio**: Grave um áudio descrevendo a emergência
   - O bot transcreverá e responderá com orientações + áudio

### Exemplos de Uso

**💬 Texto:**
```
Usuário: "Corte profundo no dedo, muito sangue"
Bot: "🔶 EMERGÊNCIA INTERMEDIÁRIA - CORTE PROFUNDO
1. Pressione firmemente com pano limpo sobre o corte
2. Eleve a mão acima do coração..."
```

**📍 Localização:**
```
Usuário: [Compartilha localização]
Bot: "🏥 HOSPITAIS PRÓXIMOS ABERTOS:
1. Hospital São Lucas - 1.2km
2. UPA Central - 2.8km..."
```

## 🔧 Personalização

### Modificar Prompts de IA
Edite o arquivo `prompts/prompts.js` para ajustar as respostas:

```javascript
EMERGENCIA_MEDICA: `
Você é um assistente virtual de emergências médicas...
// Customize as instruções aqui
`
```

### Alterar Número de Teste
No arquivo `index.js`, modifique a variável:

```javascript
const numeroAlvo = '5518997390218'; // Seu número aqui
```

### Configurar Raio de Busca
No arquivo `services/locationService.js`:

```javascript
const radius = 5000; // Raio em metros
```

## 🚨 Limitações e Avisos

⚠️ **IMPORTANTE**: Este bot **NÃO substitui atendimento médico profissional**

- **Não fornece diagnósticos médicos**
- **Não recomenda medicamentos**
- **Sempre oriente a buscar ajuda médica profissional**
- **Em emergências graves, ligue 192 (SAMU)**

## 🔍 Troubleshooting

### Problemas Comuns

**❌ QR Code não aparece:**
```bash
# Limpe o cache e reinicie
rm -rf .wwebjs_auth
npm start
```

**❌ Erro de API:**
- Verifique se as chaves estão corretas no `.env`
- Confirme se as APIs estão ativas nas respectivas plataformas

**❌ Bot não responde:**
- Verifique os logs no console
- Confirme se o número está na variável `numeroAlvo`

### Logs do Sistema
O bot possui sistema de logs coloridos:
- ℹ️ **Info** - Operações normais
- ⚠️ **Warning** - Avisos e mensagens não suportadas  
- ❌ **Error** - Erros que precisam de atenção

## 📝 Scripts Disponíveis

```bash
npm start      # Inicia o bot em produção
npm run dev    # Inicia com nodemon (desenvolvimento)
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

**⚕️ Desenvolvido com ❤️ para salvar vidas através da tecnologia**
