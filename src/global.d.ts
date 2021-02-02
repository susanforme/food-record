import _React from 'react';
import { io as _io } from 'socket.io-client';

declare global {
  const React: typeof _React;
  const io: typeof _io;
}
