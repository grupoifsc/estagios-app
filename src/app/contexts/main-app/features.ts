export interface Features {
    title: string,
    summary: string,
    icon?: string,
    details?: string[]
  }
  

export const MAIN_FEATURES : Features[] = [
    {
      title: 'Compartilhamento',
      summary: 'Compartilhe anúncios de vagas de estágio com toda a rede de instituições cadastradas',
      icon: 'img/compartilhar.png',
      details: [
        'Com nosso serviço, você participa de um ecossistema centralizado para o compartilhamento de vagas de estágios. Este ecossistema facilita a disseminação de oportunidades de estágio com toda a rede de instituições de ensino cadastradas e ajuda a criar oportunidades de colaboração construtivo entre os espaços acadêmicos e a indústria.'
      ]
    },
    {
      title: 'Integração e Automação',
      summary: 'Integre o serviço web com o seu sistema e automatize o envio e recebimento de anúncios de vagas de estágio',
      icon: 'img/collaborate.png',
      details: [
        'Um serviço web é projetado para integrar-se e automatizar a troca de informações com os sistemas existentes das organizações.', 
        'Ao receber anúncios de diversas empresas em um único sistema, se elimina a necessidade de gerenciar múltiplas fontes de informação. Isso simplifica a administração e reduz a carga de trabalho envolvida na coleta e processamento desses anúncios. Isto diminui a necessidade de intervenção manual e reduz o risco de erros. ',
        'Para estudantes, isto significa que todas as informações sobre vagas são acessíveis exclusivamente por meio dos sistemas acadêmicos das Instituições de Ensino (IEs). Assim, mantemos o acesso às vagas dentro dos sistemas das IEs, garantindo que os dados dos estudantes permaneçam protegidos e que a comunicação sobre vagas respeite as políticas de privacidade das instituições.'
      ]
    },
    {
      title: 'Escolha do Público Alvo',
      summary: 'Escolha quais instituições receberão seus anúncios',
      icon: 'img/information.png',
      details: [
        'Você pode selecionar quais Instituições de Ensino receberão suas ofertas de vagas. Assim, você pode direcionar a vaga para instituições específicas que atendem ao perfil desejado dos candidatos.' ,      ]
    },
    {
      title: 'Moderação',
      summary: 'Rejeite anúncios falsos, ofensivos ou que violem as políticas da sua instituição',
      icon: 'img/banned.png',
      details: [
        'Com a funcionalidade de moderação, as IEs têm total controle sobre quais vagas de estágio são exibidas para seus alunos. Elas podem revisar e aprovar ou rejeitar os anúncios, garantindo que apenas oportunidades relevantes e em conformidade com suas políticas sejam divulgadas.', 
        'Isso protege os estudantes de anúncios falsos ou inadequados e mantém a qualidade das informações disponíveis.'
      ]
    },
    {
      title: 'Open Source',
      summary: 'Seu time de desenvolvedores pode revisar e melhorar o código, garantindo que o sistema se mantenha robusto e confiável',
      icon: 'img/open-source.png',
      details: [
        'Sendo um sistema open source, o código-fonte é aberto e acessível para qualquer pessoa. Isso não apenas promove a transparência, mas também permite uma maior segurança, uma vez que a comunidade pode revisar e contribuir para o aprimoramento contínuo do sistema. A natureza open source garante que qualquer vulnerabilidade ou problema possa ser rapidamente identificado e corrigido, aumentando a confiança e a segurança para todas as partes envolvidas.'
      ]
    },
    {
      title: 'Demo',
      summary: 'Se sua empresa não deseja integração com o sistema, utilize o serviço por meio de uma aplicação web fácil e simples de usar',
      icon: 'img/demo.png',
      details: [
        'Entendemos que nem todas as empresas têm sistemas próprios ou desejam se envolver em integrações técnicas. Por isso, oferecemos uma alternativa prática: uma aplicação web simples e fácil de usar. Com essa aplicação, você poderá gerenciar suas vagas de estágio diretamente na nossa plataforma, sem precisar de sistemas adicionais ou integrações complicadas. Essa ferramenta permite que você crie, edite e acompanhe seus anúncios de forma direta e intuitiva, garantindo que você possa aproveitar todos os benefícios do nosso serviço web com facilidade.',
        'Essa aplicação é ideal para familiarizar-se com a interface e os recursos do nosso serviço. No entanto, é importante observar que esta ferramenta não é acessível pelos estudantes, sendo destinada exclusivamente à gestão e administração por parte da sua instituição.',
        ''
      ]
    }
  ]