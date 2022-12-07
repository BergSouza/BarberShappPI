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
  agenda: []
}

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: {
    value: { ...usuario }
  },
  reducers: {
    update: (state, action: PayloadAction<Usuario>) => {
      state.value = action.payload;
    },
  }
})

export const { update } = usuarioSlice.actions;

export const usuarioReducer = configureStore({
  reducer: usuarioSlice.reducer
});