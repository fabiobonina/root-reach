import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
import _ from 'lodash'

const db = new PouchDB('vuedb')
const remotedb = new PouchDB('http://localhost:5984/vuedb')

Vue.use(Vuex)

const state = {

}

PouchDB.debug.disable()

state.create = data => {
  return db.post(data)
}

state.update = data => {
  return db.post(data)
}
state.delete = data => {
  return db.remove(data)
}

state.findUsers = () => {
  function map (doc, emit) {
    if (doc.type === 'user') {
      emit(doc.createdAt)
    }
  }
  return db.query(map, {include_docs: true}).then(users =>
    _.map(users.rows, (user) => user.doc)
  )
}

state.recaregarUsers = (obj, prop) => {
  state.findUsers().then(users => {
    obj[prop] = _.map(users, (user) => user)
  })
  if (remotedb) {
    db.sync(remotedb)
  }
}
//<--Clientes-->
state.findClientes = () => {
  function map (doc, emit) {
    if (doc.type === 'cliente') {
      emit(doc.createdAt)
    }
  }
  return db.query(map, {include_docs: true}).then(clientes =>
    _.map(clientes.rows, (cliente) => cliente.doc)
  )
}

state.recaregarClientes = (obj, prop) => {
  state.findClientes().then(clientes => {
    obj[prop] = _.map(clientes, (cliente) => cliente)
  })
  if (remotedb) {
    db.sync(remotedb)
  }
}

state.findClienteById = (id) => {
    return db.get(id).then(function (doc) {
      console.log(doc);
      return doc;
    }).catch(function (err) {
      console.log(err);
  })
}
//<--Clientes--> 
//<--Localidades-->
state.findLocalidadesByClienteId = (clienteId) => {
  function map (doc, emit) {
    if (doc.clienteId === clienteId) {
      emit(doc.createdAt)
    }
  }
  return db.query(map, {include_docs: true}).then(localidades =>
    _.map(localidades.rows, (localidade) => localidade.doc)
  ).catch( function (err) {
  console.log(err)
  })
}
state.findLocalidades = () => {
  function map (doc, emit) {
    if (doc.type === 'localidade') {
      emit(doc.createdAt)
    }
  }
  return db.query(map, {include_docs: true}).then(localidades =>
    _.map(localidades.rows, (localidade) => localidade.doc)
  )
}

state.recaregarLocalidades = (obj, prop) => {
  state.findLocalidades().then(localidades => {
    obj[prop] = _.map(localidades, (localidade) => localidade)
  })
  if (remotedb) {
    db.sync(remotedb)
  }
  
}

state.findLocalidadeById = (id) => {
    return db.get(id).then(function (doc) {
      console.log(doc);
      return doc;
    }).catch(function (err) {
      console.log(err);
  })
}
//<--Localidades-->
//<-categorias--->
state.findCategorias = () => {
  function map (doc, emit) {
    if (doc.type === 'categoria') {
      emit(doc.createdAt)
    }
  }
  return db.query(map, {include_docs: true}).then(categorias =>
    _.map(categorias.rows, (categoria) => categoria.doc)
  )
}

state.recaregarCategorias = (obj, prop) => {
  state.findCategorias().then(categorias => {
    obj[prop] = _.map(categorias, (categoria) => categoria)
  })
  if (remotedb) {
    db.sync(remotedb)
  }
}

state.findCategoriaById = (id) => {
    return db.get(id).then(function (doc) {
      console.log(doc);
      return doc;
    }).catch(function (err) {
      console.log(err);
  })
}
//</-categorias--->
//<-grupos--->
state.findGrupos = () => {
  function map (doc, emit) {
    if (doc.type === 'grupo') {
      emit(doc.createdAt)
    }
  }
  return db.query(map, {include_docs: true}).then(grupos =>
    _.map(grupos.rows, (grupo) => grupo.doc)
  )
}

state.recaregarGrupos = (obj, prop) => {
  state.findGrupos().then(grupos => {
    obj[prop] = _.map(grupos, (grupo) => grupo)
  })
  if (remotedb) {
    db.sync(remotedb)
  }
}

state.findGrupoById = (id) => {
    return db.get(id).then(function (doc) {
      console.log(doc);
      return doc;
    }).catch(function (err) {
      console.log(err);
  })
}
//</-grupos--->
//<-fabricantes--->
state.findFabricantes = () => {
  function map (doc, emit) {
    if (doc.type === 'fabricante') {
      emit(doc.createdAt)
    }
  }
  return db.query(map, {include_docs: true}).then(fabricantes =>
    _.map(fabricantes.rows, (fabricante) => fabricante.doc)
  )
}
state.recaregarFabricantes = (obj, prop) => {
  state.findFabricantes().then(fabricantes => {
    obj[prop] = _.map(fabricantes, (fabricante) => fabricante)
  })
  if (remotedb) {
    db.sync(remotedb)
  }
}
state.findFabricanteById = (id) => {
    return db.get(id).then(function (doc) {
      console.log(doc);
      return doc;
    }).catch(function (err) {
      console.log(err);
  })
}
//</-fabricantes--->



const mutations = {
    SET_USER(state, user){
        state.currentUser = user
    },
    SET_CURRENT_CHANNEL(state, channel){
        state.currentChannel = channel
    },
    SET_PRIVATE(state, isPrivate){
        state.isPrivate = isPrivate
    }
}

const actions = {
    setUser({commit}, user){
        commit("SET_USER", user)
    },
    setCurrentChannel({commit}, channel){
        commit("SET_CURRENT_CHANNEL", channel)
    },
    setPrivate({commit}, isPrivate){
        commit("SET_PRIVATE", isPrivate)
    }
}

const getters = {
    currentUser: state => state.currentUser,
    currentChannel: state => state.currentChannel,
    isPrivate: state => state.isPrivate
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})