// api/http.ts
// ✅ CORRIGIDO com melhor tratamento de erros e debug

import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// ⚠️ Validação de configuração
if (!import.meta.env.VITE_API_URL) {
  console.warn(
    "⚠️ VITE_API_URL não definido!\n" +
    "Crie um arquivo .env na raiz do projeto com:\n" +
    "VITE_API_URL=http://localhost:8000/api"
  );
}

const http = axios.create({
  baseURL, // ✅ Já inclui /api no final
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

// 🐛 DEBUG: Log das requisições (remover em produção)
http.interceptors.request.use(
  (config) => {
    console.log("📤 Request:", {
      method: config.method?.toUpperCase(),
      url: config.baseURL + config.url,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// 🐛 DEBUG: Log das respostas
http.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED") {
      console.error(
        "❌ ERRO DE CONEXÃO:\n" +
        `Backend não está rodando em ${baseURL}\n` +
        "Verifique se o servidor Django está ativo!"
      );
    } else if (error.response) {
      console.error("❌ Response Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else {
      console.error("❌ Unknown Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default http;