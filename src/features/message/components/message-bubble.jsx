import PropTypes from 'prop-types';
import { useState } from 'react';

export const MessageBubble = ({ content = 'hello', isUserMessage = false }) => {
    const bgColor = isUserMessage ? 'bg-black text-white' : 'bg-gray-100';
    const [isRightClicked, setRightClicked] = useState(false);
    const [isDeleted, setIsDeleteMessage] = useState(false);

    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    if (isDeleted) {
        return;
    }

    return (
        <span
            style={{
                maxWidth: '300px',
                wordBreak: 'break-all',
                overflow: 'hidden',
                display: 'inline-block',
                alignSelf: !isUserMessage ? 'flex-start' : 'flex-end',
            }}
            className={`mx-4 my-1 rounded-lg p-3 ${bgColor} text-md`}
            onContextMenu={e => {
                e.preventDefault();
                setRightClicked(true);
                setPoints({
                    x:
                        e.screenX + 200 >= window.innerWidth
                            ? window.innerWidth - 150
                            : e.pageX,
                    y:
                        e.screenY + 200 >= window.innerHeight
                            ? window.innerHeight - 200
                            : e.pageY,
                });
            }}
        >
            {content}
            {isRightClicked && (
                <div className="position-relative">
                    <div
                        className="w-200 absolute box-border rounded-lg bg-gray-800"
                        style={{ top: `${points.y}px`, left: `${points.x}px` }}
                        onMouseLeave={() => setRightClicked(false)}
                    >
                        <ul className="m-0 list-none p-2">
                            <li className="cursor-pointer p-3 hover:bg-black">
                                Forward
                            </li>
                            <li
                                className="cursor-pointer p-3 hover:bg-black"
                                onClick={() => setIsDeleteMessage(true)}
                            >
                                Delete
                            </li>
                            <li className="cursor-pointer p-3 hover:bg-black">
                                Pin
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </span>
    );
};

MessageBubble.propTypes = {
    content: PropTypes.string.isRequired,
    isUserMessage: PropTypes.bool.isRequired,
};
