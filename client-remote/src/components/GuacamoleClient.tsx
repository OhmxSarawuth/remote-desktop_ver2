// // src/components/GuacamoleClient.tsx
// import { useEffect, useRef, useState } from 'react';
// import Guacamole from 'guacamole-common-js';

// import Guacamole from 'guacamole-common-js';

// const tunnel = new Guacamole.WebSocketTunnel('/guacamole/websocket-tunnel');

// type Props = {
//   tunnelUrl: string;
//   connectionParams: string;
// };

// export default function GuacamoleClient({ tunnelUrl, connectionParams }: Props) {
//   const displayRef = useRef<HTMLDivElement | null>(null);
//   const [client, setClient] = useState<Guacamole.Client | null>(null);

//   useEffect(() => {
//     const tunnel = new Guacamole.WebSocketTunnel(tunnelUrl);
//     const client = new Guacamole.Client(tunnel);

//     setClient(client);

//     if (displayRef.current) {
//       displayRef.current.innerHTML = '';
//       displayRef.current.appendChild(client.getDisplay().getElement());
//     }

//     client.connect(connectionParams);

//     window.addEventListener('beforeunload', () => client.disconnect());

//     return () => {
//       client.disconnect();
//     };
//   }, [tunnelUrl, connectionParams]);

//   return (
//     <div>
//       <div ref={displayRef} style={{ width: '100%', height: '600px', border: '1px solid #aaa' }} />
//       <button onClick={() => client?.disconnect()}>Disconnect</button>
//     </div>
//   );
// }
export default function Guacamole(){
  return (
    <div>eiei</div>
  )
}
