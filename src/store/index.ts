import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
import { ITagsViewState } from './modules/tags-view'
import { IPermissionState } from './modules/permission'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
  tagsView: ITagsViewState
  permission: IPermissionState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
