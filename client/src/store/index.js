import Vue from 'vue';
import Vuex from 'vuex';

import drawingModule from './modules/drawingModule';
import errorModule from './modules/errorModule';
import gameModule from './modules/gameModule';
import globalModule from './modules/globalModule';
import socketModule from './modules/socketModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    drawingModule,
    errorModule,
    gameModule,
    globalModule,
    socketModule,
  },
});

export default store;
