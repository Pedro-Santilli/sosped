const axios = require('axios');
const logger = require('../utils/logger');
const { LOCALIZACAO_HOSPITAL } = require('../prompts/prompts');
const { buscarHospitaisProximos, gerarPromptLocalizacao } = require('../services/locationService');

const GROQ_API_KEY = process.env.GROQ_API_KEY;

module.exports = async function handleLocation(message) {
    logger.info(`[handleLocation] Localização recebida de ${message.from}`);

    const latitude = message.location.latitude;
    const longitude = message.location.longitude;

    const hospitais = await buscarHospitaisProximos(latitude, longitude);

    if (!hospitais.listaDetalhada.length) {
        logger.warn(`[handleLocation] Nenhum hospital encontrado nas coordenadas (${latitude}, ${longitude})`);
        await message.reply("❌ Nenhum hospital foi encontrado na sua região.");
        return;
    }

    const prompt = gerarPromptLocalizacao({
        latitude,
        longitude,
        hospitais: hospitais.listaDetalhada,
        horaMensagem: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    });

    try {
        const res = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: LOCALIZACAO_HOSPITAL },
                    { role: 'user', content: prompt }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                }
            }
        );

        const respostaIA = res.data.choices?.[0]?.message?.content || "Erro ao gerar resposta.";
        logger.info(`[handleLocation] Resposta da IA: ${respostaIA}`);
        await message.reply(respostaIA);
    } catch (err) {
        logger.error(`[handleLocation] Erro ao consultar IA: ${err.message}`);
        await message.reply("Erro ao consultar os hospitais.");
    }
};
