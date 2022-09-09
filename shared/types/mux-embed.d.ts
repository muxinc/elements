declare module 'mux-embed' {
  export type {
    Metadata,
    Options,
    AdEventTag,
    AdEventAssets,
    ErrorEvent,
    TimeUpdateEvent,
    RenditionChangeEvent,
    OrientationChangeEvent,
    RequestCompletedEvent,
    RequestFailedEvent,
    NetworkEvent,
    HlsOptions,
    DashOptions,
  } from './mux';

  export {
    monitor,
    init,
    destroyMonitor,
    addHLSJS,
    addDashJS,
    removeHLSJS,
    removeDashJS,
    emit,
    utils,
    events,
  } from './mux';

  export default {
    monitor,
    init,
    destroyMonitor,
    addHLSJS,
    addDashJS,
    removeHLSJS,
    removeDashJS,
    emit,
    utils,
    events,
  };
}
