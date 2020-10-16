import React, { Component } from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);
    
  }
  
  
    render() {
      // console.log(this.props.database); 
      const {listItem, stt, onDelete, onChangeStatus, showUpdateTask} = this.props;
      const {name, status, id} = listItem;
        return (
            <tr>
                  <td>
                    {
                      stt
                    }
                  </td>
                  <td>
                    {name}
                  </td>
                  <td className="text-center">
                    <span 
                      className={status ? "label label-success" : "label label-danger"}
                      onClick={() => onChangeStatus(id)}
                      >
                      {                     
                        status ? "Đã hoàn thành" : "Chưa hoàn thành"                   
                      }
                    </span>
                  </td>
                  <td className="text-center">
                    <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={() => showUpdateTask(id)}
                    
                    >
                      <span 
                        className="fa fa-pencil mr-5" 
                      />Sửa
                    </button>
                    &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => onDelete(id)}
                    >
                      <span className="fa fa-trash mr-5" />Xóa
                    </button>
                  </td>
                </tr>
        );
    }
}

export default ListItem;