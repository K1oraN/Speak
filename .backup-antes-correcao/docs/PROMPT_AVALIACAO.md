# Prompt de avaliação e prática

O prompt real é montado por `src/core/prompt.ts` com UUID, idioma, nível, cenário, modo, roteiro e contrato JSON. Na tela de prática clique em Copiar instruções e cole na aba ChatGPT. Escolha a voz e inicie a conversa manualmente.

Modo explicação: explicar uma etapa por vez, aguardar “próxima etapa”, aceitar dúvidas em português, sem avaliação. Modo conversação: pergunta no idioma alvo, aguardar resposta natural, aceitar alternativas, corrigir erros importantes brevemente e continuar. Ao receber “encerramos por aqui”, retornar JSON escrito conforme contrato exibido no prompt; não ler o JSON em voz alta quando possível. Não inventar medições, notas ou evidências. Se o ChatGPT não dispuser de evidência acústica, pronunciation=null. Fluidez percebida é qualitativa; compreensão é inferida. Não incluir explicação na avaliação. Notas e limitações são autodeclaradas. O SpeakUp não envia comandos nem verifica semanticamente o diálogo.
