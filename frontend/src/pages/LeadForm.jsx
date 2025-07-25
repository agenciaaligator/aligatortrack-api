import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Página para renderizar formulários dinâmicos de leads. Recupera a
 * configuração do formulário pelo ID fornecido na URL e constrói
 * dinamicamente os campos. Envia os dados para a API ao concluir.
 */
function LeadForm() {
  const { id } = useParams();
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    // Busca a configuração do formulário no backend
    fetch(`/forms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormConfig(data);
      })
      .catch(() => {
        console.error('Erro ao carregar formulário');
      });
  }, [id]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formularioId: id, clienteId: formConfig.clienteId, dados: formData }),
      });
      setEnviado(true);
    } catch (err) {
      console.error('Erro ao enviar lead', err);
    }
  };

  if (!formConfig) return <div className="p-4">Carregando...</div>;
  if (enviado) return <div className="p-4">Obrigado! Em instantes você será redirecionado para o WhatsApp.</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{formConfig.nome}</h1>
      {formConfig.campos.map((campo) => (
        <div key={campo.nome} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {campo.label}
          </label>
          {campo.tipo === 'texto' && (
            <input
              type="text"
              required={campo.obrigatorio}
              onChange={(e) => handleChange(campo.nome, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          )}
          {campo.tipo === 'telefone' && (
            <input
              type="tel"
              required={campo.obrigatorio}
              onChange={(e) => handleChange(campo.nome, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          )}
          {campo.tipo === 'dropdown' && (
            <select
              required={campo.obrigatorio}
              onChange={(e) => handleChange(campo.nome, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="">Selecione...</option>
              {campo.opcoes.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
          {campo.tipo === 'radio' && (
            <div className="flex flex-col space-y-1">
              {campo.opcoes.map((opt) => (
                <label key={opt} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={campo.nome}
                    value={opt}
                    onChange={(e) => handleChange(campo.nome, e.target.value)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Enviar
      </button>
    </form>
  );
}

export default LeadForm;