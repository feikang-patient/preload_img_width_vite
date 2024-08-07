import 'element-plus/es/components/message/style/css';
import { ElMessage } from 'element-plus';

let prevType = '';
let prevInstance = null;

interface MessageOptions {
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
    center?: boolean;
    duration?: number;
    showClose?: boolean;
}

function showMessage(options: MessageOptions) {
    const { type } = options;
    //判断弹窗的类型是不是一致，一致就不弹出
    if (prevInstance && prevType === type) {
        return;
    }
    prevType = type;

    if (prevInstance) {
        prevInstance.close();
    }

    prevInstance = ElMessage({
        ...options,
        onClose: () => {
            prevType = '';
        }
    });
}

export default showMessage;
