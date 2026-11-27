import ReactDOM from 'react-dom';
import { cn } from '../../lib/utils';

const tones = {
  success: 'bg-success-500 text-canvas',
  error: 'bg-error-500 text-canvas',
};

const Notification = (props) => {
  const { title, message, status } = props;
  const tone = tones[status] ?? 'bg-brand text-canvas';

  return ReactDOM.createPortal(
    <div
      className={cn(
        'fixed bottom-0 left-0 flex h-20 w-full items-center justify-between rounded-t-none px-8 shadow-[0_1px_8px_rgba(0,0,0,0.2)] md:left-[calc(50%-20rem)] md:w-160 md:rounded-t-[6px]',
        tone
      )}
    >
      <h2 className="m-0 text-2xl font-bold">{title}</h2>
      <p className="m-0">{message}</p>
    </div>,
    document.getElementById('notifications')
  );
};

export default Notification;
