import React, {Component} from "react";
import './Navigation.css';

 

export default class Navigation extends Component {
   constructor(props){
        super(props)
        this.state={
            locations:[],
            locationsduplicate:[]
        }
    }

    componentDidMount=()=>{
      this.setState({
        locations: this.props.locations
      })
    }


    // Used for rendering
    getClasses(ctx, index) {
        let classes = `material-icons ${ctx}`;
        if (ctx === 'dots') {
            if (this.isLast(index)) {
                classes += ' hidden';
            }
        } else {
            classes += this.isLast(index) ? ' small' : ' x-small';
            if (index === 0) {
                classes += ' first';
            }
        }
        return classes;
    }

 

    // Used for rendering
    isLast(index) {
        return index === this.props.locations.length - 1;
    }
    isFirst(index) {
        return index === 0;
    }

 

    getIndex(list,item){
      let i=0;
      for(i=0;i<list.length;i++){
        if(list[i]===item){
          return(i)
        }
      }
    }


    prevLocation = (index) => {
        console.log(index)
        let locationlist = this.state.locations
        console.log(this.state.locations)
        let orgdata = locationlist[index]
        let tempdata = locationlist[index - 1]
        locationlist[index] = tempdata
        locationlist[index - 1] = orgdata
        this.setState({
            locations: locationlist
        })
    }

    nextLocation = (index) => {
        console.log(index)
        let locationlist = this.state.locations
        console.log(this.state.locations)
        let orgdata = locationlist[index]
        let tempdata = locationlist[index + 1]
        locationlist[index] = tempdata
        locationlist[index + 1] = orgdata
        this.setState({
            locations: locationlist
        })
    }

 

    listlocations=()=>{
      let locationlist=this.state.locations;
      return locationlist.map((location,index)=>{
        return(
          <li key={'row' + this.getIndex(locationlist,location)} data-testid={'location-' + this.getIndex(locationlist,location)}
                                    className="layout-row justify-content-between align-items-center mr-8 pl-40 relative">
                                    <div className="layout-column justify-content-start align-items-center handle">
                                        <i className={this.getClasses('marker', this.getIndex(locationlist,location))}>{this.isLast(this.getIndex(locationlist,location)) ? 'room' : 'radio_button_checked'}</i>
                                        <i className={this.getClasses('dots', this.getIndex(locationlist,location))}>more_vert</i>
                                    </div>
                                    <div className="location-name">
                                        <p className="caption text-start mb-4" data-testid="location">{location}</p>
                                    </div>
                                    <div>
                                    {index ===0 ? null :
                                        <button className="icon-only small mx-0" data-testid="up-button" disabled={this.isFirst(this.getIndex(locationlist,location))}  onClick={()=>this.prevLocation(this.getIndex(locationlist,location))}>
                                            <i className="material-icons">arrow_upward</i>
                                        </button>}
                                        {this.isLast(index)? null :
                                        <button className="icon-only small mx-0" data-testid="down-button" disabled={this.isLast(this.getIndex(locationlist,location))} onClick={()=>this.nextLocation(this.getIndex(locationlist,location))}>
                                            <i className="material-icons">arrow_downward</i>
                                       </button>}
                                   </div>
                               </li>
                               )})

 

    }

 

    render() {
        return (
            <div className="layout-row align-items-center justify-content-center navigation-screen">
                <div className="card layout-row flat map-card">
                    <section className="card pb-16 pr-16 flex-auto layout-column justify-content-center">
                        <ul className="pl-0" data-testid="location-list">
                                {/*Use this li for rendering each location item as it contains all the data-testid attributes required for the tests to pass*/}
                          {this.listlocations()}
                        </ul>
                    </section>
                    <section className="flex-auto">
                        <img src="images/map.svg" className="fill" alt="map"/>
                    </section>
                </div>

 

            </div>
        );
    }
}