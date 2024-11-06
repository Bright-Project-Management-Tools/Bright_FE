// eslint-disable-next-line no-unused-vars
import '../styles/font.css';
import SettingSideBar from './setting-side-bar';

function SettingPage() {
    return (
        <div className="flex">
            {/* Setting Page Section */}
            <div>
                <SettingSideBar />
            </div>
        </div>
    );
}

export default SettingPage;
