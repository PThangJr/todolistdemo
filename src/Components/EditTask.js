import React, { Component } from 'react';

class EditTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldName:'',
      fieldStatus: ''
    }
  }
  checkDisplayEditTask = () => {
    const {statusEditTask, statusUpdateTask, onHandleChange, onAdd, onUpdate, checkStatus, onReset, hideEditTask} = this.props;
    // console.log(checkStatus)

    if (statusEditTask) {
      
      return (
        <div className="panel panel-warning">
  <div className="panel-heading flex">
    <h3 
      className="panel-title">
        {
          statusUpdateTask ? "Sửa công việc" : "Thêm Công Việc"
        }
        </h3>
    <span 
      className="icon-close"
      onClick={() => hideEditTask()}
    >
    <i 
      className="far fa-times-circle"
    ></i>

    </span>
  </div>
  <div className="panel-body">
    <form>
      <div className="form-group">
        <label>Tên công việc:</label>
        <input 
          type="text" 
          className="form-control"
          name="fieldName"
          onChange={(e) => onHandleChange(e)}
          />
      </div>
     
      <label>Trạng Thái :</label>
      <div className="form-check">
        <label className="form-check-label">
          <input 
          className="form-check-input" 
          name="fieldStatus" 
          value="notComplete"
          type="radio" 
          aria-label="Text for screen reader"
          onChange={(e) => onHandleChange(e)} 
          checked={checkStatus === "notComplete"}
          />
          <span>
            Chưa hoàn thành
          </span>
        </label>
        <label className="form-check-label">
          <input 
          className="form-check-input" 
          name="fieldStatus" 
          value="complete"
          type="radio" 
          aria-label="Text for screen reader"
          onChange={(e) => onHandleChange(e)} 
          checked={checkStatus === "complete"}
          
          />
          <span>
            Hoàn thành
          </span>
        </label>
      </div>
      <br />
      <div className="text-center">
        {
          !statusUpdateTask ? ( <button 
            type="submit" 
            className="btn btn-warning"
            onClick={(e) => onAdd(e)}
            >Thêm</button>
            ) : (<button 
              type="submit" 
              className="btn btn-warning"
              onClick={(e) => onUpdate(e)}
              >Sửa</button>)
        }
       
        <button 
        type="reset" 
        className="btn btn-danger"
        onClick={(e) => onReset(e)}
        >Reset</button>
      </div>
    </form>
  </div>
</div>

      )
    }
    
  }
render() {
  
return (
  <div>
    {this.checkDisplayEditTask()}
  </div>
);
}
}

export default EditTask;