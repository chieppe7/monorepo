import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.create_user': { paramsTuple?: []; params?: {} }
    'medicine.index': { paramsTuple?: []; params?: {} }
    'medicine.store': { paramsTuple?: []; params?: {} }
    'medicine.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicine.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicine.index_instances': { paramsTuple?: []; params?: {} }
    'medicine.store_instance': { paramsTuple?: []; params?: {} }
    'medicine.update_instance': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicine.destroy_instance': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ubs.index': { paramsTuple?: []; params?: {} }
    'ubs.store': { paramsTuple?: []; params?: {} }
    'ubs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ubs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'medicine.index': { paramsTuple?: []; params?: {} }
    'medicine.index_instances': { paramsTuple?: []; params?: {} }
    'ubs.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'medicine.index': { paramsTuple?: []; params?: {} }
    'medicine.index_instances': { paramsTuple?: []; params?: {} }
    'ubs.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.create_user': { paramsTuple?: []; params?: {} }
    'medicine.store': { paramsTuple?: []; params?: {} }
    'medicine.store_instance': { paramsTuple?: []; params?: {} }
    'ubs.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'medicine.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicine.update_instance': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ubs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'medicine.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicine.destroy_instance': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ubs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}