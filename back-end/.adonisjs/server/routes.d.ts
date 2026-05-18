import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'medicine.index': { paramsTuple?: []; params?: {} }
    'medicine.store': { paramsTuple?: []; params?: {} }
    'medicine.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicine.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'medicine.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'medicine.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'medicine.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'medicine.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'medicine.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}