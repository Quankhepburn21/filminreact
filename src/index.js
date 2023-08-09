import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// Nếu muốn app chạy nhanh và làm offline cần đổi unregister() to register() bên dưới. 
// Lưu ý điều này kèm với vài rủi ro.
// Đọc thêm về tệp chương trình service worker: https://bit.ly/CRA-PWA
serviceWorker.register();
