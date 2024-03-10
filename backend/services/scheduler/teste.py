from datetime import datetime

def passou_da_hora(hora_atual, hora_agendada):

  try:
    hora_atual = datetime.strptime(hora_atual, '%Y-%m-%d %H-%M-%S')
    hora_agendada = datetime.strptime(hora_agendada, '%Y-%m-%d %H-%M-%S')
  except ValueError:
    raise ValueError('Formato de data/hora inválido.')

  return hora_atual >= hora_agendada

# Exemplo de uso
hora_atual = datetime.now().strftime('%Y-%m-%d %H-%M-%S')
hora_agendada = "2024-03-10 13-34-56"

# if passou_da_hora(hora_atual, hora_agendada):
#   print("A hora atual já passou da hora agendada.")
# else:
#   print("A hora atual ainda não passou da hora agendada.")

print(passou_da_hora(hora_atual, hora_agendada))