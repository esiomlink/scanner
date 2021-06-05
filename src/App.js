import { useState, useCallback, useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import './App.css';

function App() {
  const [data, setData] = useState('Not Found');
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState({});
  console.log(data)
  console.log('tout les devices :',devices)
  console.log('choix du device :',deviceId);



// filtre seulement les cameras
  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );

  //sors toutes les devices
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  // mets la derniere camera en principal
  useEffect(() => {
      setDeviceId(devices[devices.length - 1]);
  }, [devices]);

  const videoConstraints = {
    facingMode: 'environment',
    aspectRatio: 1,
    frameRate: 60,
    focusDistance: 0,
    resizeMode: 'crop-and-scale',
    zoom: 0.1,
    focusMode: 'manual',
    deviceId: deviceId&&deviceId.deviceId,
  };

  return (
    <div className='cam'>
      {deviceId && (
        <BarcodeScannerComponent
          width={500}
          height={500}
          videoConstraints={videoConstraints}
          onUpdate={(err, result) => {
            if (result) setData(result.text);
            else setData('Not Found');
          }}
        />
      )}
      <p>{data}</p>
      <div className='selector-device'>
        {devices &&
          devices.map((device, key) => (
            <div>
              <input
                id={device.deviceId}
                value={device.deviceId}
                name={device.deviceId}
                type='checkbox'
                onChange={(e) => setDeviceId(e.target.value)}
              />
              {device.label || `Device ${key + 1}`}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
