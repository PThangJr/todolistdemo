
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
      dataInit: null,
      data: null,
      statusEditTask: false,
      id: null,
      fieldName: "",
      fieldStatus: "notComplete",
      statusUpdateTask: false,
      valueAdd: null,
      filterValue: {
        name: "",
        status: -1
      },
      sort: {
        sortBy: "",
        sttSort: {
          status: -1
        },
        nameSort: {
          status: -1
        },
        statusSort: {
          status: -1
        },
      }

    }

  }
  componentWillMount() {
    console.log("Loading data....");
    
    fetch(linkAPI)
      .then(response => response.json())
      .then(data => {
        
        
        this.setState({
          data: data,
          dataInit: data
        })
      })
       
  }
  
  
  
  displayEditTask = () => {
    // status: true
    
    const {statusEditTask, statusUpdateTask} = this.state;
    if(statusUpdateTask) {
      this.setState({
        statusEditTask: true,
        statusUpdateTask: false,
        fieldName:"",
        fieldStatus: "notComplete"
      });
    }
    else {
      this.setState({
        statusEditTask: true,
        statusUpdateTask: false
      })
    }
  }
  
  onHandleChange = (e) => {
    const {statusUpdateTask} = this.state;
    const target = e.target;
    const name = target.name;
    const value = target.value;
    // console.log(e.target.name);
    this.setState({
      [name]: value
  
    })
    // console.log(this.state);
    // this.setState({statusUpdateTask: false});
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
          data.push(result)
          this.setState({data: data})
        })
        .then(() => {
          this.setState({
            fieldName:"",
            fieldStatus: "notComplete"
          })

        })
        .catch(error => error)
    }
  }
  onUpdate = (e) => {
    
    const {data, valueAdd, id, fieldName, fieldStatus} = this.state;
    if(fieldName) {
      const value = {
        name: fieldName,
        status: fieldStatus
      }
    
      const newUpdateData = data.map((item, index) => {
        if(item.id === id) {
          item.name = fieldName;
          item.status = fieldStatus;
        }
        return item;
      })
      this.setState({
        data: newUpdateData
      })
      
      e.preventDefault();
      console.log(valueAdd)
      const options = {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(value)
      }
      fetch(linkAPI + "/" + id, options)
        .then(response => response.json())
        .then(result => {
          console.log(result)
        })
        .catch(error => alert("Update tên công việc không thành công!!!"))
    }
    else {
      alert("Vui lòng nhập công việc!!")
    }
    
  }
  onReset = (e) => {
    // const {fieldName, fieldStatus} = this.state;

    e.preventDefault();
    this.setState({
      fieldName: "",
      fieldStatus: ""
    })
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
    this.showEditTask();
    this.setState({
      fieldName: dataFilter[0].name,
      fieldStatus: dataFilter[0].status,
      statusUpdateTask: true,
      valueAdd: dataFilter[0],
      id: id
    })
    // console.log(dataFilter)
    // console.log(this.state)
  }
  showEditTask = () => {
    const {statusUpdateTask} = this.state;
    this.setState({
      statusEditTask: true,
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
  filterItem = (fieldName, fieldStatus) => {
    const {filterValue, sort} = this.state;

      this.setState({
        filterValue: {
          name: fieldName,
          status: parseInt(fieldStatus)
        }
      })

    

    
  }
  onHandleSort = (e, nameSort, statusSort) => {
    let {sort, filterValue} = this.state;
    const {name, status} = filterValue;
      // if (sort.)
      // console.log(sort.nameSort.status);
    // let newSort = {...sort};
    // console.log(newSort);
    // newSort = {
    //   [nameSort]: {
    //     status: newSort[nameSort].status + 1
    //   }
    // }
      // console.log(newSort);
      this.setState({
        sort: {
          ...sort,
          [nameSort] : {
            status: sort[nameSort].status < 1 ? sort[nameSort].status + 1: -1
          },
          sortBy: nameSort
          
          }
      })
      // if (sort[nameSort].status === 1) {
      //   this.setState({
      //     sort: {
      //       ...sort,
      //       [nameSort] : {
      //         status: -1
      //       }
      //     }
      //   })
      // }
      
      // console.log(sort);
      
  }


  render() {
    let {data,dataInit, statusEditTask, fieldName, fieldStatus, statusUpdateTask , statusSort, nameSort, filterValue, sort} = this.state;
    // console.log(statusEditTask)
    // console.log(fieldName);
    // console.log(fieldStatus);
    // console.log(typeof filterValue.status);
    // console.log(this.generateId())
    // console.log(sort);
    
    if(data) {
      // console.log(this.state);
      
    // console.log(data);
    var filterValueFunc = () => {
      if(filterValue) {
        
        if(filterValue.name) {
         
          data = data.filter((item) => {
           return item.name.toUpperCase().indexOf(filterValue.name.toUpperCase().trim()) !== -1;
         })
      }
      // console.log(data);
      
      // console.log(filterValue);
      
        data = data.filter(item => {
          if(filterValue.status === -1) {
            return item;
          }
           else {
             return item.status === (filterValue.status === 0 ? true: false);

           }     
          
        })
        // console.log(dataFilter);
        // console.log(data);
        return data
      }    
    }
    filterValueFunc();
          
      
       if (sort) {
    filterValueFunc();
         
         if (sort.sortBy === "nameSort" ){
          // data = dataInit
          // if(sort["nameSort"].status === -1) {
          //   data = dataInit;
            
          // }
           if(sort["nameSort"].status === 0) {
            
            data = data.sort((a, b) =>{
              if(a.name.toUpperCase() < b.name.toUpperCase()) return -1             
            })
          }
          else if(sort["nameSort"].status === 1) {
            
            data = data.sort((a, b) =>{
              if(a.name.toUpperCase() > b.name.toUpperCase()) return -1
            })
          }
        }
         else if (sort.sortBy === "statusSort" ) {
          if(sort["statusSort"].status === -1) {
            
          }
           if(sort["statusSort"].status === 0) {
            
            data = data.sort((a, b) =>{
              return (a.status === b.status) ? 0 : a.status ? -1 : 1;          
            })
          }
          else if(sort["statusSort"].status === 1) {
            console.log(data);
            
            data = data.sort((a, b) =>{
              return (a.status === b.status) ? 0 : a.status ? 1 : -1;          
            })
          }
         }
      }
    }
      
    

    
    


    return (
      <div className="App">
  <div className="container">
    <div className="text-center">
      <h1>Quản Lý Công Việc</h1>
      
      <hr />
    </div>
    <div className="row">
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <EditTask 
          statusEditTask={statusEditTask}
          onHandleChange={(e) => this.onHandleChange(e)}
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
              filterItem={(fieldName, fieldStatus) => this.filterItem(fieldName, fieldStatus)}
              onHandleSort={(e, nameSort, statusSort) => this.onHandleSort(e, nameSort, statusSort)}
              sort={sort}
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