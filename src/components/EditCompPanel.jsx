import React, {Component} from 'react';

const sendMessageToContent = message => chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
});

const fetchFromContent = (message, callback) => chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, callback);
});

export default class EditCompPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCompHStretch: false,
            isCompVStretch: false,
            containerSize: {width: 0, height: 0}
        }

        this.setIsCompHStretch = (e) => {
            const isCompHStretch = e.target.checked;

            sendMessageToContent({type: "setIsCompHStretch", value: isCompHStretch})

            this.setState({isCompHStretch})
        }

        this.setIsCompVStretch = (e) => {
            const isCompVStretch = e.target.checked;

            sendMessageToContent({type: "setIsCompVStretch", value: isCompVStretch})

            this.setState({isCompVStretch})
        }

        this.setContainerWidth = (e) => {
            const width = e.target.value;
            const containerSize = {
                width,
                height: this.state.containerSize.height
            }

            this.setState({containerSize})

            sendMessageToContent({type: "setContainerSize", value: containerSize})
        }

        this.setContainerHeight = (e) => {
            const height = e.target.value;
            const containerSize = {
                width: this.state.containerSize.width,
                height
            };

            this.setState({containerSize});

            sendMessageToContent({type: "setContainerSize", value: containerSize});
        }

        this.updateStateFromContent = response => this.setState({
            isCompHStretch: response.state.horizontal.isStretch,
            isCompVStretch: response.state.vertical.isStretch,
            containerSize: response.containerSize
        })
    }

    componentDidMount() {
        fetchFromContent({type: "fetchContentData"}, this.updateStateFromContent)
    }

    render() {
        return (
            <div className="edit-comp-panel">
                <div className="section">
                    <header className="strong">Stretch component</header>
                    <div className="content">
                        <div>
                            <input type="checkbox" checked={this.state.isCompHStretch} onChange={this.setIsCompHStretch}/>
                            <label className="checkbox-label">Horizontal</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={this.state.isCompVStretch} onChange={this.setIsCompVStretch}/>
                            <label className="checkbox-label">Vertical</label>
                        </div>
                    </div>
                </div>


                <div class="section">
                    <header className="strong">Container</header>
                    <div className="content">
                        <div className="size-container">
                            <label>Width</label>
                            <input className="size-input" type="number" value={this.state.containerSize.width} onChange={this.setContainerWidth} min="0" step="5"/>
                            <label>Height</label>
                            <input className="size-input" type="number" value={this.state.containerSize.height} onChange={this.setContainerHeight} min="0" step="5"/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
