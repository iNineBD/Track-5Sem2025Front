
# 📦 Documentação de Testes

Este documento descreve os testes unitários implementados para o pacote `service`, incluindo estrutura do projeto, bibliotecas utilizadas, explicação dos testes existentes e instruções para escrever novos testes.

---

## 👥 Responsabilidades e Boas Práticas

- **Designação de testes unitários**: Os *desenvolvedores responsáveis pelas tarefas que envolvem regras de negócio* devem, obrigatoriamente, implementar os testes unitários referentes às funcionalidades desenvolvidas. Isso garante que quem conhece a lógica da regra seja também responsável por validá-la formalmente via testes.

- **Momento da criação dos testes**: Os testes unitários devem ser implementados **imediatamente após a finalização da funcionalidade**, e **apenas quando a regra de negócio estiver validada**. Isso evita testes escritos com base em requisitos instáveis ou incorretos, além de garantir maior fidelidade entre o código testado e o comportamento esperado.

- **Responsabilidade pela integridade dos testes**:
  - **Quem identifica** que um teste foi quebrado (por um `go test` ou CI/CD) deve corrigir imediatamente.
  - **Quem altera uma funcionalidade** que causa a quebra de testes é o responsável principal por **atualizar ou reescrever os testes afetados**, assegurando que o novo comportamento esteja coberto adequadamente.

🔁 *Essa responsabilidade compartilhada fortalece a cultura de testes e promove mais confiabilidade no ciclo de desenvolvimento contínuo.*

---

## 🗂 Estrutura do Projeto

```
project-root/
│
├── service/
│   └── statisticsservice_test.go  # Arquivo de testes unitários
│
├── pkg/
│   └── database/
│       └── connection.go  # Define a função ConnectDB()
```

⚠️ **Importante**: Certifique-se de que o banco esteja ativo e populado com os dados exigidos pelos testes (usuários, projetos, papéis, etc.).

---

# 🧪 Testes Unitários com Vitest e Vue

## 📚 Bibliotecas Utilizadas

| Biblioteca              | Uso                                                                 |
|-------------------------|----------------------------------------------------------------------|
| `@vue/test-utils`       | Utilizada para montar componentes Vue em ambiente de teste          |
| `vitest`                | Framework de testes para JavaScript/TypeScript, inspirado no Jest   |

### Instalação das dependências

```bash
npm install -D vitest @vue/test-utils
```

---

## ✅ Testes Implementados

### 🔹 `DoughnutChart`
- Testa o componente `DoughnutChart.vue`.
- Verifica:
  - Se o título do gráfico é renderizado corretamente.
  - Se exibe a mensagem "No data" quando `noData` está `true`.

### 🔹 `UText`
- Testa o componente `UText.vue`.
- Garante que:
  - Renderiza corretamente com propriedades padrão (`<p>`, alinhamento à esquerda, etc.).
  - Aplica corretamente propriedades customizadas (`tag`, `align`, `size`, `weight`, `color`).
  - Permite classes adicionais passadas via `attrs`.

---

## 🛠 Como Criar um Teste Unitário em Nuxt/Vue com Vitest

### Exemplo básico

```ts
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import MeuComponente from "~/components/meu-componente.vue";

describe("MeuComponente", () => {
  it("renderiza corretamente", () => {
    const wrapper = mount(MeuComponente);
    expect(wrapper.text()).toContain("Texto esperado");
  });
});
```

### Estrutura recomendada
1. Use `describe` para agrupar testes relacionados a um componente.
2. Dentro do `describe`, utilize `it` para cada caso de teste.
3. Use `mount()` para renderizar o componente isoladamente.
4. Use `expect()` para fazer asserções sobre o comportamento esperado.

---

## 🔧 Pré-Requisitos

- Projeto configurado com Nuxt 3 e Vue 3
- Node.js instalado
- Dependências de testes instaladas:

```bash
npm install -D vitest @vue/test-utils
```

---

## 🚀 Como Executar os Testes

### Rodar todos os testes:
```bash
npx vitest
```

### Rodar em modo watch:
```bash
npx vitest --watch
```

### Rodar testes de um arquivo específico:
```bash
npx vitest run caminho/para/componente.test.ts
```

---

## 🧪 Dicas para Expandir os Testes

- Sempre valide casos **felizes (happy path)** e **casos de erro**.
- Crie funções auxiliares para montar dados repetitivos (ex: props, mocks, entradas padrão).
- Utilize testes unitários e de snapshot quando necessário para componentes visuais.
- Use `describe.each` ou loops para cobrir múltiplas combinações de entrada.
- Prefira `expect()` com boas mensagens ao invés de `console.log()` para depuração.
- Teste acessibilidade (ex: `aria-labels`, foco, navegação por teclado) quando aplicável.

---

## 📌 Conclusão

Este documento serve como base para quem desejar manter ou expandir os testes do serviço. Siga o padrão estabelecido e mantenha sempre cobertura para os principais fluxos e erros possíveis.
