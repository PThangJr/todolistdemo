import React, { Component } from 'react';

class OptionsTask extends Component {
    constructor(props) {
        super(props);
        
    }
   
    render() {
        const {displayEditTask, showEditTask} = this.props;
        return (
            <div>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => displayEditTask()}
                    // onClick={() => showEditTask()}
                    >
                    <span className="fa fa-plus mr-5" />Thêm Công Việc
        </button>
                <div className="row mt-15">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nhập từ khóa..." />
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button">
                                    <span className="fa fa-search mr-5" />Tìm
                </button>
                            </span>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default OptionsTask;