
import EditTask from './Components/EditTask';
import OptionsTask from "./Components/OptionsTask";
import TableData from './Components/TableData';
import React, { Component } from 'react';
import linkAPI from "./Components/Constants";
import db from "./Database/db.json";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      statusEditTask: false,
      fieldName: "",
      fieldStatus: "notComplete",
      statusUpdateTask: false
    }

  }
  componentWillMount() {
    fetch(linkAPI)
      .then(response => response.json())
      .then(data => {
        this.setState({data})
      })
       
  }
  
  
  
  displayEditTask = () => {
    // status: true
    const {statusEditTask, statusUpdateTask} = this.state;
    this.setState({
      statusEditTask: true,
      statusUpdateTask: false
    });
  }
  
  onHandleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    // console.log(e.target.name);
    this.setState({
      [name]: value
    })
  }
   generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
 
  onAdd = (e) => {
    e.preventDefault();
    const {fieldName, fieldStatus, data} = this.state;
    if (!fieldName.trim()) {
      alert("Bạn phải nhập tên công việc")
    }
    else {
      const valueInput = {
        name: fieldName, 
        status: fieldStatus === "complete" ? true : false
      };
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(valueInput)
      }
      // data.push(valueInput);
      //     this.setState({data})
      fetch(linkAPI, options)
        .then(response => response.json())
        .then(result => {
          console.log(result.id)
          data.push(result)
          this.setState({data: data})
        })
        .catch(error => error)

    }
  }
  onUpdate = (e) => {
    e.preventDefault();
    console.log(e)
  }
  onReset = (e) => {
    e.preventDefault();
  }
 onDelete = (id) => {
  // console.log(id);
  const {data, statusEditTask} = this.state;


  const options = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
  fetch(linkAPI + "/" + id, options)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      // const dataFilter = data.filter((item, index) => {
      //   return item.id !== result.id
      // })
      // this.setState({data: dataFilter})
    })
    .catch(error => error);
    const dataFilter = data.filter((item, index) => {
        return item.id !== id
      })
      this.setState({data: dataFilter})
      this.setState({statusEditTask: false}) 
 }
  onChangeStatus = (id) => {
    const {fieldStatus, data} = this.state;
    
    const changeStatus = data.map((item, index) => {
      if (item.id === id) {
        item.status = !item.status
      }
      return item
    })
    this.setState({
      data: changeStatus
    })
    const dataFilter = data.filter((item, index) => {
      return item.id === id;
    }).map(item => {
      item.status = item.status;
      return item;
    })
    const options = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(dataFilter[0])
    }
    console.log(dataFilter)
    fetch(linkAPI + "/" + id, options)
      .then(response => response.json())
      .then(result => result)
      .catch(error => alert("Thay đổi trạng thái không thành công!!!"))
    // console.log(changeStatus)
  }
  showUpdateTask = (id) => {
    const {statusUpdateTask, statusEditTask, data, fieldName, fieldStatus} = this.state;
    const dataFilter = data.filter((item, index) => {
      return item.id === id
    })
    this.displayEditTask();
    this.setState({
      // fieldName: dataFilter[0].name,
      // fieldStatus: dataFilter[0].status,
      statusUpdateTask: true
    })
    console.log(dataFilter)
    console.log(this.state)
  }
  showEditTask = () => {
    const {statusUpdateTask} = this.state;
    this.setState({
      statusUpdateTask: false
    })
  }
  hideEditTask = () => {
    const {statusUpdateTask, fieldName, fieldStatus} = this.state;
    this.setState({
      fieldName: "",
      fieldStatus: "notComplete",
      statusEditTask: false
    })
  }

  render() {
    const {data, statusEditTask, fieldName, fieldStatus, statusUpdateTask} = this.state;
    // console.log(data);
    // console.log(statusEditTask)
    // console.log(fieldName);
    // console.log(fieldStatus);
    // console.log(this.generateId())
    


    return (
      <div className="App">
  <div className="container">
    <div className="text-center">
      <h1>Quản Lý Công Việc</h1>
      <button
        onClick={() => this.onGenerateData()}
      >Generate Data</button>
      <hr />
    </div>
    <div className="row">
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <EditTask 
          statusEditTask={statusEditTask}
          onHandleChange={(e) => this.onHandleChange(e)}
          checkStatus={fieldStatus}
          fieldName={fieldName}
          fieldStatus={fieldStatus}
          onAdd={(e) => this.onAdd(e)}
          onUpdate={(e) => this.onUpdate(e)}
          onReset={(e) => this.onReset(e)}
          displayEditTask={() => this.displayEditTask()}
          hideEditTask={() => this.hideEditTask()}
          statusUpdateTask={statusUpdateTask}
          
        />
      </div>
      <div className={statusEditTask ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
        <OptionsTask
          displayEditTask={() => this.displayEditTask()}
          // showEditTask={() => this.showEditTask()}
        ></OptionsTask>
        <div className="row mt-15">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <TableData 
              database={data}
              onDelete={(id) => this.onDelete(id)}
              onChangeStatus={(id) => this.onChangeStatus(id)}
              showUpdateTask={(id) => this.showUpdateTask(id)}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
  }
}

export default App;