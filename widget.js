function registerPing() {
  
	//Step 4: Pong is listening and receives data
  	BWEvents.subscribe('pong',  BWProperties.namespace + '_pong', (response) => {
      		//Step 5: Message is sent to overlay on-screen
      		BWAPI.post('/events/' + BWProperties.event_id + '/sendOnscreenMessage', {message: response.message});
	});
  
}

function registerPong() {
  
	//Step 2: Ping is listening and recieves the ping
	BWEvents.subscribe('ping', BWProperties.namespace +'_ping', (response) => {
      		let message = response.message;
      		message += 'is the best game ever';
      
      		//Step 3: Pong is sent
      		BWEvents.publish('pong', {message : message})
	});
}

function sendPing() {
  	//Step 1: User Clicks button and sends bing
 	BWEvents.publish('ping', {'message' : 'Ping Pong '}); 
}

BWEvents.subscribe('user_joined', BWProperties.namespace +'_user_joined', (response)=> {
 	console.log(response); 
});

registerPong();
registerPing();

//Make senPing function accessible publicly through namespace
this.sendPing = sendPing;
