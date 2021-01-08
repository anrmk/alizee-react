# TODO

### 9/27/2020 | task/261
- [x] Implement auth

### 9/29/2020 | task/261
- [x] Refactor auth
- [x] Add to store and Header a avatar url
- [x] Add *Google* auth
- Add token to each api request

### 9/30/2020 | task/261
- [x] Add token to each api request
- [x] Remove *Object.assign* from reducers
- [ ] Add *Twitter* auth
- [ ] Add *Apple* auth
- [ ] Add *Facebook* auth

### 10/01/2020 | task/235
- [x] Add post
  - Photo / Video
  - User name
  - User photo
  - Favorite btn
  - Comments btn
  - Buy btn
  - Share btn
  - AltText
  - Location
- [x] Posts list (Infinity scroll)

### 10/06/2020 | task/237
- [x] Added Vertical List
- [x] Social Buttons

### 10/07/2020 | task/237
- [x] Added to Post a Username
- [x] Refactor Share list
- [x] Added a Post page
- [x] Added constants for routes
- [x] Fixed infinity loading on PostsList
- [x] **Push task to remote!**

### 10/08/2020 | task/235

#### FileUploader
- [x] Video / Image
- [x] Errors

### 10/08/2020 | task/235

#### FileUploader
- [x] Constraints media
  - [x] Max 10 images
  - [x] Images size
  - [ ] if selected type 'one' next can be selected only this type (Video can be only one)
- [x] Add creating form

### 10/13/2020 | task/235

#### FileUploader
- [x] Connect api with creating form (create post and media)
- [x] Wrap FileUploader to ForwardRef
- [x] Fix Gallery images if some of them has a different size

### 10/15/2020 | task/237

- [x] Make share like modal not popover
- [x] Remove all react bootstrap

### 10/16/2020 | task/298

- [x] Avatar
- [x] Button 'Message'
- [x] Button 'Follow'
- [x] Button 'Settings' (...)
- [x] Number of posts, followers, following
- [x] First name & Last name
- [x] Website

### 10/16/2020 | task/299

- [x] Tabs
- [x] Grid gallery
- [x] Replace gallery to ourself

### 10/28/2020 | task/297

- [x] Notification hub add constant path
- [x] Remove max width for modal in PostList
- [x] Remove async from Feed page by createPost
- [x] Remove id from Suggestion
- [x] Remove from PrivateRouter remove state isAuthenticated
- [x] Change route
- [x] Change fullName to name Profile
- [x] Uncomment background (Girl)
- [x] Remove dispatch from createMessage (Action) ?
- [x] Add thumbnail to getPosts
- [x] Create task in 'devops' Merge suggestion and relationship
- [x] Reset user remove

### 10/29/2020 | epic/244

### 10/29/2020 | task/253

- [x] Create a page
- [x] Create a left tabs with container for sub pages (bootstrap)

### 10/29/2020 | task/253

- [x] Create a form for Edit Profile in domain
- [x] Add validation to form
- [x] Add masks to input
- [x] Think about how to store a user data, cause when we update info on edit profile settings we should update

### 11/06/2020 | fix

- [x] Fix burger
- [x] Fix Avatar item (block with text)

### 12/03/2020 | 

- [x] Rename Messenger to MessagesList
- [x] Add translate
- [ ] Rename all room to chat
- [x] Esc btn key move out to constants
- [x] Create avatar component 40x40 - medium, small 24x24, large 64x64

### 12/07/2020 | task 242
- [x] Create List Component
- [x] Create List Item Component
- [x] Create List Component for watching stories with auto play
- [x] Create List Item Component for watching stories with auto play
- [x] Create api for stories (POST, GET, DELETE)

# BUGS
- [ ] SignUp -> SignIn with remember -> Click some pages -> SignOut = can't go to SignUp page (everytime redirect to SignIn), trouble with *PrivateRoute*.
**Possible fix:** *try to wrap logout button to Link with 'to="/signIn"' prop.*

# REFACTOR
- [x] Remove material ui, should stay only icons
- [x] Rename -btn-play to __btn-play Posts.scss
- [x] Changed **protoTypes** to **propTypes**

# FEATURES
- [ ] Add HTTP statuses (constants) ?
- [ ] Add Refresh token
- [x] Add persist redux (Added in Aziz commit)

# QUESTIONS
- [ ] Ask about the https://dev.azure.com/storchmusicgroup/Alizee/_workitems/edit/295/ task

# THOUGHTS
Q: Payable post type by default private type or private post is only available for subscribers and then it can be payable too?
A: Remove payable type, there exist only two types Private and Public (add amount)

- [x] Say to Aziz to change config of pretier
- [x] Don't transform data into components, components should take already transformed data
-----
- [ ] (BUG) Posts count updated on getting fellings on Profile page
- [x] Check interests
- [ ] EditProfile, SignUp, SignIn, Chat
- [x] Button width fix
- [ ] Move out all consts from forms to constants files
- [ ] Dynamic Form: generate inputs with passed config
- [ ] Hide drawer on "chat" and "live-stream" pages


## Streaming
Set media stream to srcObject(video tag)
Create two instances of the class MediaRecorder and cut a video by 5 seconds;

References: 
https://github.com/mattdiamond/Recorderjs
https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder


## Optimization
- Use hooks useCallback/useMemo
- Use React.memo for list/items
- Removed modals from list components(maybe move out to root component and new Modal will be, its mutation via redux)
- Change position "Save" btn and "Close" btn in modals


### Code example
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [streamIntervalId, setStreamInterval] = useState(null);
  const [mediaHref, setMediaHref] = useState("#");

  const handleDataAvailable = (event) => {
    console.log("DATA:", event);
    if (event.data.size > 0) {
      // recordedChunks.push(event.data);
      // const url = URL.createObjectURL(event.data);
      fetch(`https://example.com/upload.php`, { method:"POST", body: event.data })
        .then(response => console.log(response.text()))
      // console.log("URL", url)
      
      // setMediaHref(url);
    } else {
      // ...
    }
  }

  useEffect(() => {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {       
      // navigator.getUserMedia({video: true }, handleVideo, (e) => console.log("Error: ", e));
      (async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({video: true});
        const videoStream = new MediaStream(localStream.getVideoTracks());
        videoRef.current.srcObject = videoStream;
        setStream(localStream);
        setMediaRecorder(new MediaRecorder(localStream, { mimeType: "video/webm; codecs=vp9"  }));
      })();
    }
  }, [])

  useEffect(() => {
    if (stream && mediaRecorder) {
        console.log("MediaRecorder", mediaRecorder)
        mediaRecorder.ondataavailable = handleDataAvailable;
    }
  }, [mediaRecorder])

  const handleStartClick = () => {
    mediaRecorder.start()
    const intervalId = setInterval(() => {
      mediaRecorder.requestData();
    }, 5000);
    setStreamInterval(intervalId);
  }

  const handleStopClick = () => {
    mediaRecorder.stop()
    clearInterval(streamIntervalId);
    setStreamInterval(null);
  }


  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
      <a href={mediaHref}>DOWNLOAD</a>
    </div>
  )


Default route (and user profile too)
/
Subroutes
/...






## Stories Component

- Controls
- Video/Image
- Progress (progress from video time length)

### API

#### Stories

- defaultInterval
- items
- autoPlay
- loop
- keyboardNavigation
- onStoryStart
- onStoryEnd
- onStoriesEnd

### Structure

- Context
