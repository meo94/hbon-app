### Data Model

```javascript
//
 
```



```javascript
// luu lastest state cua 1 thiet bi
const devices = [
    "<device_id>": {
        name: "phone",
    	owner: "<user_id>",
    	type: "phone",
    	online: true,
    	state: {
    		on: true,
            // currentActivity: {},
    	}
    },
	"<device_id>": {
        name: "desktop",
    	owner: "<user_id>",
    	type: "desktop",
    	online: true,
    	state: {
    		on: true,
            // currentActivity: {},
    	}
    },
	"<device_id>": {
        name: "tv",
    	owner: "<user_id>",
    	type: "tv",
    	online: true,
    	state: {
    		on: true,
            // currentActivity: {},
    	}
    },   
]

// luu latest requested state cua nguoi dung cho 1 thiet bi
const device_configs = [
     "<device_id>": {
    	owner: "<user_id>",
    	value: {
    		on: true,
    		// currentActivity: {},
    	}
    },
]
```

