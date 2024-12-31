import { useNetworkStore } from '../store/networkStore';
import { ColorPicker } from './controls/ColorPicker';

export function SceneControls() {
  const { backgroundColor, setBackgroundColor } = useNetworkStore();

  return (
    <div className="absolute top-4 right-4 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Scene Settings</h2>
      <ColorPicker
        label="Background Color"
        color={backgroundColor}
        onChange={setBackgroundColor}
      />
    </div>
  );
}