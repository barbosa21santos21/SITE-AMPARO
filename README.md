# Site Amparo+ 🛡️

Site profissional para a empresa Amparo+, especializada em seguros funerário e veicular para motoristas de aplicativo.

## 📋 Sobre o Projeto

Este site foi desenvolvido para apresentar os produtos da Amparo+ e captar novos revendedores. Inclui:

- **Página Inicial**: Apresentação da empresa e seção destacada para revendedores
- **Seguro Funerário**: Informações detalhadas dos planos Essencial (R$ 24,90) e Família (R$ 35,00)
- **Seguro Veicular**: Calculadora interativa para motoristas de aplicativo
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🚀 Hospedagem no GitHub Pages

### Passo 1: Criar Repositório
1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique em "New repository" (Novo repositório)
3. Nome sugerido: `amparo-site` ou `amparo-landing`
4. Marque como "Public" (Público)
5. Clique em "Create repository"

### Passo 2: Upload dos Arquivos
1. Na página do repositório, clique em "uploading an existing file"
2. Arraste todos os arquivos da pasta `amparo-landing` para o GitHub
3. Ou use o comando git (se tiver instalado):
```bash
git clone https://github.com/SEU-USUARIO/amparo-site.git
cd amparo-site
# Copie todos os arquivos do projeto para esta pasta
git add .
git commit -m "Adicionar site Amparo+"
git push origin main
```

### Passo 3: Ativar GitHub Pages
1. No repositório, vá em "Settings" (Configurações)
2. Role até a seção "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Escolha "main" branch e "/ (root)"
5. Clique em "Save"
6. Aguarde alguns minutos e seu site estará disponível em:
   `https://SEU-USUARIO.github.io/amparo-site`

## 🔧 Configurações Necessárias

### 1. Número do WhatsApp
Edite o arquivo `js/script.js` na linha 3:
```javascript
whatsappNumber: '5511999999999', // Substitua pelo número real
```

### 2. Informações de Contato
Edite os arquivos HTML para atualizar:
- Telefone: `(11) 99999-9999`
- Email: `contato@amparomais.com.br`
- CNPJ: `00.000.000/0001-00`

### 3. Logos e Imagens
Substitua os arquivos na pasta `images/`:
- `logo-amparo-geral.jpg`: Logo principal da empresa
- `logo-seguro-veicular.jpg`: Logo específico do seguro veicular
- `favicon.ico`: Ícone do site (16x16 ou 32x32 pixels)

### 4. Links das Redes Sociais
Atualize os links no rodapé de todas as páginas:
```html
<a href="https://facebook.com/amparomais" class="social-link">
<a href="https://instagram.com/amparomais" class="social-link">
```

## 🎨 Personalização

### Cores da Marca
As cores estão definidas no arquivo `css/style.css`:
```css
:root {
    --primary-color: #1B365D;    /* Azul Marinho */
    --secondary-color: #D4AF37;  /* Dourado */
    --accent-color: #28A745;     /* Verde */
    --whatsapp-color: #25D366;   /* Verde WhatsApp */
}
```

### Valores dos Seguros
Para alterar preços, edite:
- **Seguro Funerário**: `seguro-funerario.html` (linhas com valores)
- **Seguro Veicular**: `seguro-veicular.html` e `js/script.js` (objeto CONFIG)

## 📱 Funcionalidades

### Calculadora de Preço
- Seleção de planos base (R$ 250 ou R$ 350)
- Coberturas adicionais com checkboxes
- Atualização automática do preço total
- Botão para enviar cotação via WhatsApp

### Formulário de Contato
- Validação em tempo real
- Máscara automática para telefone
- Mensagem de sucesso após envio

### Botões WhatsApp
- Mensagens pré-formatadas para cada produto
- Integração direta com WhatsApp Web/App

## 🔍 SEO e Performance

### Meta Tags Incluídas
- Descrições otimizadas para cada página
- Open Graph para redes sociais
- Keywords relevantes

### Performance
- CSS e JavaScript otimizados
- Imagens com alt text
- Estrutura semântica HTML5

## 📞 Suporte

Para dúvidas sobre o site:
1. Verifique este README primeiro
2. Teste todas as funcionalidades em diferentes dispositivos
3. Confirme se todos os links do WhatsApp estão funcionando

## 🔄 Atualizações Futuras

### Melhorias Sugeridas
- Integração com Google Analytics
- Chat online automático
- Sistema de blog/notícias
- Área do cliente logado
- Integração com CRM

### Manutenção
- Atualize preços conforme necessário
- Mantenha informações de contato atualizadas
- Monitore funcionamento dos formulários
- Teste regularmente em diferentes navegadores

## 📄 Estrutura de Arquivos

```
amparo-landing/
├── index.html              # Página inicial
├── seguro-funerario.html   # Página do seguro funerário
├── seguro-veicular.html    # Página do seguro veicular
├── css/
│   └── style.css          # Estilos principais
├── js/
│   └── script.js          # JavaScript principal
├── images/
│   ├── logo-amparo-geral.jpg
│   ├── logo-seguro-veicular.jpg
│   └── favicon.ico
└── README.md              # Este arquivo
```

## 🎯 Objetivos do Site

1. **Captação de Revendedores**: Seção destacada com comissões e benefícios
2. **Vendas Diretas**: Botões WhatsApp em todas as páginas
3. **Credibilidade**: Design profissional e informações completas
4. **Conversão**: Calculadora interativa e CTAs estratégicos

---

**Desenvolvido para Amparo+ - Seguros que Protegem** 🛡️

*Site responsivo, otimizado e pronto para conversão!*

