import sinon from 'sinon';
export const server = sinon.fakeServer.create();
window.xhr = sinon.useFakeXMLHttpRequest();
