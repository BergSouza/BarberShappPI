import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../interfaces/usuario.interface';

const usuario: Usuario = {
  id: '',
  nome: '',
  telefone: '',
  email: '',
  foto_perfil: '',
  eBarbeiro: false,
  eDonoBarbearia: false,
  barbearias: [],
  agendamentos_cliente: [],
  agendamentos_barbeiro: [],
  trabalha_barbearia: '',
  pedido_barbeiro: [],
  comentario_barbeiro: [],
  avaliacao: 0
}

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: {
    value: { ...usuario }
  },
  reducers: {
    update: (state, action: PayloadAction<Usuario>) => {
      state.value = {...action.payload};
    },
  }
})

export const { update } = usuarioSlice.actions;

export const usuarioReducer = configureStore({
  reducer: usuarioSlice.reducer
});