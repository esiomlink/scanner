import { useState, useCallback, useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import './App.css';

function App() {
  const [data, setData] = useState('Not Found');
  const [devices, setDevices] = useState([]);
  const [devicesId, setdevicesId] = useState();
  console.log(devicesId)

  console.log('le resultat est : ', data);
  console.log('tout les devices :', devices);

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    const lastKey = devices.length - 1;
    setdevicesId(devices[lastKey]);
  }, [devices]);


  const videoConstraints = {
    facingMode: 'environment',
    aspectRatio: 1,
    frameRate: 60,
    focusDistance: 0,
    resizeMode: 'crop-and-scale',
    zoom: 0.1,
    focusMode: 'manual',
    deviceId: devicesId && devicesId.deviceId,
  };
/* function handleChange(e){
  setdevicesId(devices[e.target.value])
}
console.log(handleChange) */


  return (
    <div className='cam'>
      {devicesId && (
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
        <select onChange={(e) => setdevicesId(devices[e.target.value])}>
          {devices &&
            devices.map((device, key) => (
              <option
                id={device.deviceId}
                value={key}
                name={device.deviceId}
              >
                {device.label || `Device ${key + 1}`}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default App;
