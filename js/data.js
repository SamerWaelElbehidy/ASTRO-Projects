/* ==========================================================================
   Project data — ASTRO Projects
   Every entry below was written from the actual source code / repositories of
   the project (firmware, notebooks, READMEs). Projects that belong to more
   than one domain list several categories in `cats`.
   ========================================================================== */
(function () {
  const GH = 'https://github.com/SamerWaelElbehidy/';

  const profile = {
    name: 'ASTRO Projects',
    first: 'ASTRO',
    last: 'Projects',
    role: 'Machine Learning & Embedded Systems Engineer',
    tagline: 'I build intelligent systems where machine learning meets hardware — from eye-controlled wheelchairs to smart cities in miniature.',
    location: 'Damietta, Egypt',
    email: 'samer.wael.2003@gmail.com',
    phone: '+201554563448',
    phoneDisplay: '(+20) 155 456 3448',
    links: {
      github: 'https://github.com/SamerWaelElbehidy',
      linkedin: 'https://www.linkedin.com/in/samer219wael/'
    },
    now: [
      { role: 'IT Officer', org: 'Information Technology Institute (ITI) – Damietta Branch', when: 'Apr 2026 – Present' },
      { role: 'Co-Founder & Lead AI / Robotics Instructor', org: 'ASTRO', when: 'May 2025 – Present' }
    ],
    skills: {
      'Machine Learning': ['Python', 'TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'OpenCV', 'CNNs', 'TinyML'],
      'Embedded & IoT': ['ESP32', 'STM32', 'Arduino', 'Raspberry Pi', 'C / C++', 'ROS', 'LIDAR', 'REST APIs'],
      'Software': ['React', 'TypeScript', 'Next.js', 'NestJS', 'Flask', 'FastAPI', 'Flutter', 'React Native', 'Firebase'],
      'Cloud & Ops': ['Microsoft Azure', 'MLOps', 'Docker', 'PostgreSQL', 'Redis', 'Git']
    }
  };

  const categories = [
    { id: 'healthcare', name: 'Healthcare & Assistive Tech', short: 'Healthcare', color: '#ff5d7a', icon: '✚', blurb: 'Devices and models that help people move, see, hear, heal and be monitored.' },
    { id: 'ai',         name: 'AI & Machine Learning',        short: 'AI / ML',    color: '#9b7bff', icon: '◈', blurb: 'Deep learning, classical ML and applied data science, trained and deployed.' },
    { id: 'vision',     name: 'Computer Vision & Speech',     short: 'Vision',     color: '#33d6ff', icon: '◉', blurb: 'Systems that see, listen and understand: faces, plates, gaze, voice.' },
    { id: 'iot',        name: 'Smart Spaces & IoT',           short: 'IoT',        color: '#3ddc97', icon: '⌂', blurb: 'Connected buildings, parking, labs and infrastructure built around ESP32 and STM32 nodes.' },
    { id: 'agri',       name: 'Agriculture & Environment',    short: 'Agri',       color: '#9be15d', icon: '✿', blurb: 'Sensing and automation for plants, air quality and energy.' },
    { id: 'robotics',   name: 'Robotics & Vehicles',          short: 'Robotics',   color: '#ff9f43', icon: '⚙', blurb: 'Line followers, fire-fighting cars, RC vehicles and closed-loop control.' },
    { id: 'embedded',   name: 'Embedded & Electronics',       short: 'Embedded',   color: '#ffd23f', icon: '⌁', blurb: 'Firmware, custom peripherals and hardware experiments from the bench.' },
    { id: 'web',        name: 'Web & Mobile Apps',            short: 'Web / Apps', color: '#4d8bff', icon: '▤', blurb: 'Full-stack products: marketplaces, stores, dashboards and mobile apps.' },
    { id: 'interactive',name: 'Games & Interactive',          short: 'Interactive',color: '#ff6bd6', icon: '✦', blurb: 'Playful devices and interfaces: games, gloves, keyboards and air mice.' }
  ];

  const P = (o) => Object.assign({ featured: false, links: {}, status: 'Built' }, o);

  const projects = [
    /* ------------------------------------------------------------------ */
    /*  FLAGSHIPS                                                          */
    /* ------------------------------------------------------------------ */
    P({
      id: 'smart-wheelchair', name: 'Smart Wheelchair', featured: true,
      cats: ['healthcare', 'robotics', 'vision', 'iot'],
      tagline: 'A wheelchair you can steer with your eyes, your voice, a joystick or your phone.',
      desc: 'A multi-input assistive wheelchair. An Arduino Nano streams joystick, tilt and heart-rate data to a Raspberry Pi, which fuses gaze tracking, speech recognition and manual input, sends commands to the controllers on the chair and mirrors its state to the cloud for a companion app.',
      points: [
        'Arduino Nano reads a joystick, an MPU-6050 and a MAX30105 and sends JSON frames to the Pi every 100 ms over a 115200-baud serial link.',
        'The Pi runs OpenCV eye-gaze tracking with a full-screen Tkinter interface that switches between joystick and gaze control modes.',
        'A background speech-recognition manager turns voice commands into drive commands.',
        'A Flask health/sensor API plus a Firebase push loop and command listener connect the chair to a Flutter companion app.',
        'An ESP32 node on the Pi\'s Wi-Fi hotspot switches a light, a fan and power sockets so the chair user can also control their room.'
      ],
      stack: ['Python', 'OpenCV', 'Tkinter', 'SpeechRecognition', 'Flask', 'Firebase', 'Flutter', 'Raspberry Pi', 'Arduino Nano', 'ESP32', 'MPU-6050', 'MAX30105']
    }),
    P({
      id: 'market-mate', name: 'Market Mate', featured: true,
      cats: ['vision', 'ai', 'healthcare', 'web'],
      tagline: 'AI smart glasses that tell visually impaired shoppers how fresh their produce is — out loud, in Arabic.',
      desc: 'Graduation project. A deep-learning produce-quality scanner that runs behind smart glasses and a companion app, with a Flask API and an admin analytics dashboard.',
      points: [
        'ResNet18 classifier trained on 20 classes: ten fruits and vegetables, each fresh or rotten, with confidence scoring.',
        'Gemini generates a natural Arabic description of the result, with a fallback path when the model is unsure or offline.',
        'Arabic text-to-speech and pre-recorded audio answer the shopper through the glasses.',
        'Flask API with MongoDB storage feeds an admin dashboard with Chart.js analytics, CSV export and device monitoring.',
        'A React admin dashboard prototype (MarketMate Admin) complements the API.'
      ],
      stack: ['PyTorch', 'ResNet18', 'Flask', 'MongoDB', 'Gemini API', 'Chart.js', 'Raspberry Pi', 'Arabic TTS', 'React'],
      links: { github: GH + 'Market_Mate' }
    }),
    P({
      id: 'drowsiness-detection', name: 'Driver Drowsiness Detection (TinyML)', featured: true,
      cats: ['healthcare', 'ai', 'vision', 'embedded'],
      tagline: 'A CNN small enough to run on an ESP32-CAM and wake a sleeping driver.',
      desc: 'A convolutional network trained in a notebook, quantized into a C header, and executed on-device on an AI-Thinker ESP32-CAM. No cloud, no phone — just a camera, a model and a buzzer.',
      points: [
        'Training notebook uses image augmentation and starts from a basic CNN for open / closed eye classification.',
        'The exported model (a ~3.9 MB model_data.h C array) takes 96×96×3 input and outputs two classes, run through EloquentTinyML with a 70 KB tensor arena.',
        'When eyes are classified closed, the firmware prints “ALERT: EYE CLOSED!” and drives a buzzer.',
        'Camera pin map and init are written for the AI-Thinker ESP32-CAM board.'
      ],
      stack: ['TensorFlow / Keras', 'TinyML', 'EloquentTinyML', 'ESP32-CAM', 'OpenCV', 'C++']
    }),
    P({
      id: 'smart-gate', name: 'Smart Gate — Egyptian License-Plate Recognition', featured: true,
      cats: ['vision', 'ai', 'iot'],
      tagline: 'A Raspberry Pi gate that reads Arabic license plates and opens for authorized cars.',
      desc: 'An access-control gate that detects Egyptian license plates, reads the Arabic letters and digits, checks them against an authorized list and opens a servo gate — with a live web dashboard and full history.',
      points: [
        'Plate detection and character detection models, trained in notebooks on Egyptian plate datasets, with a mapping from class labels to Arabic letters and Eastern-Arabic digits.',
        'Raspberry Pi 4 with an IR obstacle sensor as trigger, a USB webcam (1280×960 capture), a servo gate arm and a buzzer.',
        'Multi-threaded Python service: camera capture and the web server run side by side.',
        'Dashboard for managing authorized vehicles, live camera stream, and CSV-based logs of every detection.',
        'Laser-cut 2D maquette powered by a 3S battery pack through a step-down converter.'
      ],
      stack: ['Python', 'YOLO', 'OpenCV', 'Roboflow', 'Flask', 'Raspberry Pi 4', 'GPIO / Servo', 'CSV']
    }),
    P({
      id: 'smart-parking', name: 'Smart Parking System', featured: true,
      cats: ['iot', 'web'],
      tagline: 'Thirty-two monitored slots, an RFID gate, reservations and a mobile app.',
      desc: 'A distributed parking system: several ESP32 boards each own part of the lot and report to a master node, while a FastAPI backend and a Flutter app handle reservations.',
      points: [
        'ESP32-S3 master node reads 16 IR-sensor slots with per-slot LEDs and aggregates the rest over Wi-Fi.',
        'A second node covers slots 17–32 and an ambient-light sensor; a third runs the RFID gate/ATM and servos. Nodes find each other through mDNS.',
        'REST endpoints expose status, LED toggles and gate control.',
        'FastAPI backend with a reservation engine and Firebase service, plus a Flutter app and an ESP32-CAM node.'
      ],
      stack: ['ESP32-S3', 'ESP32', 'RFID (MFRC522)', 'mDNS', 'FastAPI', 'Firebase', 'Flutter', 'ESP32-CAM']
    }),
    P({
      id: 'smart-data-center', name: 'Smart Data Center Guardian', featured: true,
      cats: ['iot'],
      tagline: 'A server-room monitor that reacts to fire, gas, earthquakes and intruders — and texts you.',
      desc: 'One ESP32 watches a miniature data center: environment, power, motion and access. It acts on its own and sends SMS alerts through a SIM800L module.',
      points: [
        'Sensors: DHT22 temperature/humidity, gas, flame, current draw and an MPU-6050 that detects earthquake-style shaking.',
        'RFID door lock: authorized card opens a servo door, an unauthorized card raises an alert; status shown on a 16×2 LCD.',
        'Two motors with overheating detection and one-shot SMS alerts.',
        'Runs its own Wi-Fi access point with a live dashboard; buzzer handled by a non-blocking state machine.'
      ],
      stack: ['ESP32', 'DHT22', 'MPU-6050', 'MFRC522', 'SIM800L (GSM)', 'L298N', 'LCD I²C', 'Embedded C++']
    }),
    P({
      id: 'smart-foot-monitor', name: 'Podix — Smart Foot Health Monitor', featured: true,
      cats: ['healthcare', 'iot'],
      tagline: 'Pressure, temperature and humidity under the foot, with alerts for swelling and ulcer risk.',
      desc: 'A wearable sensor platform on ESP32 that maps plantar pressure and tracks skin conditions over time, with on-device thresholds, SD logging and a web dashboard.',
      points: [
        'Four piezo pressure channels drawn as a live foot heat-map (0–1200 kPa scale, alert above 600 kPa).',
        'DS18B20 temperature and DHT humidity; sustained high temperature and pressure, swelling (≥37 °C with pressure) and ulcer risk (humidity above 80 %) each have their own timers.',
        'Battery voltage monitoring, buzzer alerts and logging of the last 250 entries to SD.',
        'Web dashboard with pages for temperature, pressure, humidity, battery and history.'
      ],
      stack: ['ESP32', 'Piezo sensors', 'DS18B20', 'DHT', 'SD card', 'Embedded C++', 'HTML / CSS / JS']
    }),

    /* ------------------------------------------------------------------ */
    /*  HEALTHCARE & ASSISTIVE                                             */
    /* ------------------------------------------------------------------ */
    P({
      id: 'eye-gaze-keyboard', name: 'Eye-Gaze Keyboard with AI Suggestions',
      cats: ['healthcare', 'vision', 'ai', 'interactive'],
      tagline: 'Type and click with your eyes — with a language model completing the sentence.',
      desc: 'A hands-free typing interface for people who cannot use a keyboard. An eye tracker moves a pointer over an on-screen keyboard while a small language model proposes the next words.',
      points: [
        'Eye tracking built on the open-source GazeTracking library with blink detection and a 9-point calibration tool; ~20–30 FPS on a Raspberry Pi 5 with a USB webcam.',
        'On-screen keyboard and mouse-pointer control driven by gaze, streamed to the browser through a Flask video feed.',
        'Word suggestions from DistilGPT-2 with a 100 k-word dictionary, and an Ollama-backed assistant.',
        'Recalibration, detailed-analysis, diagnostics and MediaPipe-based experiments were built around the tracker.'
      ],
      stack: ['Python', 'OpenCV', 'GazeTracking', 'Flask', 'PyTorch', 'DistilGPT-2', 'Ollama', 'Raspberry Pi 5']
    }),
    P({
      id: 'blind-assist', name: 'Assistive Devices for the Visually Impaired',
      cats: ['healthcare', 'embedded'],
      tagline: 'Glasses, a cane and a watch that warn about obstacles by sound and vibration.',
      desc: 'Three wearable obstacle detectors built on ultrasonic ranging, each tuned for a different way of carrying the sensor.',
      points: [
        'Glasses: HC-SR04 ranging with a continuous buzzer when anything is closer than 100 cm.',
        'Cane: 30 cm detection distance driving both a vibration motor and a buzzer.',
        'Watch: dual ultrasonic sensors reading two directions at once.'
      ],
      stack: ['Arduino / ESP32', 'HC-SR04', 'Vibration motors', 'Buzzers', 'Embedded C++']
    }),
    P({
      id: 'sound-watch', name: 'Sound Watch for the Hearing Impaired',
      cats: ['healthcare', 'embedded'],
      tagline: 'Turns the direction and presence of sound into left/right vibration.',
      desc: 'A wrist-style ESP32 device with one sound sensor and one vibration motor per side, so the wearer feels which side a sound came from.',
      points: [
        'A 2-second auto-calibration measures ambient noise and sets a threshold for each sensor.',
        'Left and right channels drive independent PWM vibration motors; both go silent when the room is quiet.'
      ],
      stack: ['ESP32', 'Sound sensors', 'PWM vibration motors', 'Embedded C++']
    }),
    P({
      id: 'smart-gloves', name: 'Smart Communication Gloves',
      cats: ['healthcare', 'embedded', 'interactive'],
      tagline: 'Finger gestures become text on a display and a spoken phrase.',
      desc: 'A glove with five flex sensors that recognizes twelve finger patterns and speaks the matching message through a DFPlayer Mini.',
      points: [
        'Flex-sensor readings are thresholded per finger and matched against a gesture table.',
        'Messages such as “Hello!”, “I need food.” and “Love you” appear on an SH1106 OLED and play as pre-recorded audio.'
      ],
      stack: ['Arduino', 'Flex sensors', 'SH1106 OLED', 'DFPlayer Mini', 'U8g2']
    }),
    P({
      id: 'smart-splint', name: 'Smart Splint & SmartCast App',
      cats: ['healthcare', 'iot', 'web'],
      tagline: 'A cast that reports pressure and temperature to a bilingual mobile app.',
      desc: 'An ESP32-based smart splint measuring pressure and skin temperature, paired with a Flutter app built with Clean Architecture.',
      points: [
        'Three piezo pressure sensors, a DHT11 and a DS18B20 read every few seconds and are exposed at /api/sensors on the splint\'s own Wi-Fi hotspot.',
        'With internet available, it syncs time via NTP and pushes both the latest reading and a history to Firebase.',
        'SmartCast Flutter app uses BLoC, repository pattern and Arabic/English localization for authentication and health monitoring.'
      ],
      stack: ['ESP32', 'Firebase RTDB', 'Flutter', 'BLoC', 'Clean Architecture', 'DS18B20', 'DHT11'],
      links: { github: GH + 'SmartCast' }
    }),
    P({
      id: 'insulin-prototype', name: 'Insulin / Glucagon Dosing Prototype',
      cats: ['healthcare', 'embedded'],
      tagline: 'A closed-loop demo that reacts to “high” and “low” readings with the right pump.',
      desc: 'A bench prototype of an automatic dosing device: a calibrated load cell stands in for the sensor and two relays represent the insulin and glucagon pumps.',
      points: [
        'HX711 load cell with a push-button calibration routine and a weight threshold.',
        'Too high triggers the insulin relay, too low triggers the glucagon relay, each with LCD warnings and a beeping alarm.',
        'Cool-down and recalibration timers prevent repeated dosing.'
      ],
      stack: ['Arduino', 'HX711', 'Relays', 'LCD I²C', 'Embedded C++']
    }),
    P({
      id: 'mist-wearable', name: 'Mist — Heart-Rate Responsive Wearable',
      cats: ['healthcare', 'iot'],
      tagline: 'Measures your pulse and answers with vibration, mist and sound.',
      desc: 'A wearable that reads heart rate and blood-oxygen and triggers vibration motors, a mist relay and audio, either automatically or from a web panel.',
      points: [
        'ESP32 with MAX30102: a 100-sample buffer for stable HR/SpO₂, with finger-detection thresholding.',
        'Vibration motors, mist relay and a DFPlayer Mini are controllable through /api/motors, /api/relay and /api/automode.',
        'An STM32 variant reads an analog pulse sensor with peak detection and validates beats between 40 and 180 BPM.'
      ],
      stack: ['ESP32', 'STM32', 'MAX30102', 'Pulse sensor', 'DFPlayer Mini', 'Embedded C++']
    }),
    P({
      id: 'baby-crib', name: 'Smart Baby Crib',
      cats: ['healthcare', 'iot'],
      tagline: 'Detects crying, swings the crib and plays a lullaby.',
      desc: 'An ESP32 crib controller with a sound sensor, servo swing mechanism, LED lighting and DFPlayer audio, controlled from a web page or on its own.',
      points: [
        'Sound is sampled every 100 ms to reduce false positives; detected sound can start the swing and music automatically.',
        'Smooth floating-point servo motion; REST endpoints for play/stop, auto mode, swinging and LEDs.',
        'The web UI shows a “Your baby is crying” alert.'
      ],
      stack: ['ESP32', 'Servo', 'DFPlayer Mini', 'Sound sensor', 'Web server']
    }),
    P({
      id: 'safety-helmets', name: 'Smart Safety Helmet Family',
      cats: ['iot', 'embedded', 'healthcare'],
      tagline: 'Helmets for drivers and workers that sense impact, tilt, air and pulse.',
      desc: 'Three STM32-based helmet variants for different jobs, sharing an MPU-6050 accident detector.',
      points: [
        'Driver helmet: adaptive-baseline pulse sensing, raw-register MPU-6050 tilt, GPS (TinyGPS++) and an ESP8285 status server.',
        'Workers helmet: DHT11 temperature/humidity, MQ-135 air quality, tilt detection, LCD and DFPlayer voice alerts.',
        'Orange helmet: vibration-switch impact detection with RGB LED status and a toggle button.'
      ],
      stack: ['STM32', 'MPU-6050', 'MQ-135', 'DHT11', 'GPS', 'ESP8285', 'DFPlayer Mini']
    }),

    /* ------------------------------------------------------------------ */
    /*  AI & MACHINE LEARNING                                              */
    /* ------------------------------------------------------------------ */
    P({
      id: 'brain-tumor', name: 'Brain Tumor Detection from MRI',
      cats: ['ai', 'vision', 'healthcare', 'web'],
      tagline: 'A CNN that classifies MRI scans, deployed as a web service on Azure.',
      desc: 'Team project (six people): image preprocessing, CNN training and a Flask deployment on Microsoft Azure that returns a tumor probability for an uploaded scan.',
      points: [
        'Thousands of MRI images loaded and preprocessed for tumor / healthy classification with TensorFlow / Keras.',
        'Additional Mask R-CNN experiments in a separate notebook.',
        'Production app: a Flask service loads the saved Keras model and predicts on uploaded images.'
      ],
      stack: ['TensorFlow', 'Keras', 'OpenCV', 'Flask', 'Microsoft Azure', 'Mask R-CNN'],
      links: { github: GH + 'Brain-Tumor-Detection-Using-MRI-Images--CNN-' }
    }),
    P({
      id: 'breast-cancer-ann', name: 'Breast Cancer Prediction (ANN)',
      cats: ['ai', 'healthcare'],
      tagline: 'A neural network for benign vs malignant diagnosis.',
      desc: 'End-to-end notebook: data cleaning, visualization, correlation analysis, train/test split and an artificial neural network built with Keras.',
      points: ['Exploratory analysis with seaborn and a correlation matrix.', 'ANN trained and evaluated with TensorFlow / Keras.'],
      stack: ['Python', 'Keras', 'TensorFlow', 'Pandas', 'Seaborn', 'Scikit-learn'],
      links: { github: GH + 'ANN-Breast-Cancer-Prediction' }
    }),
    P({
      id: 'stroke-prediction', name: 'Stroke Prediction',
      cats: ['ai', 'healthcare'],
      tagline: 'Predicting stroke risk from routine patient data.',
      desc: 'A classical-ML pipeline that cleans patient records, encodes categorical data, imputes missing values and compares several models before saving the best one.',
      points: ['Text columns converted to numeric; missing values filled with the mean.', 'Scikit-learn models trained and evaluated; final model serialized with pickle.'],
      stack: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn', 'Pickle'],
      links: { github: GH + 'Stroke-Prediction' }
    }),
    P({
      id: 'facial-emotion', name: 'Facial Emotion Recognition',
      cats: ['ai', 'vision'],
      tagline: 'A CNN that reads emotions from 48×48 grayscale faces.',
      desc: 'Trains a convolutional network on a dataset of pixel strings and emotion labels, with data visualization along the way.',
      points: ['CSV of emotion + pixel values reshaped to 48×48 images.', 'Keras CNN with matplotlib / seaborn diagnostics.'],
      stack: ['Python', 'Keras', 'OpenCV', 'NumPy', 'Seaborn'],
      links: { github: GH + 'Facial-Emotion-Recognition--CNN-' }
    }),
    P({
      id: 'digit-recognition', name: 'Handwritten Digit Recognition',
      cats: ['ai', 'vision'],
      tagline: 'A Keras CNN on MNIST-style data, ~99.7 % accuracy.',
      desc: 'Full workflow: loading, null checks, normalization, reshape, augmentation, CNN training and a confusion-matrix review.',
      points: ['The notebook reports about 0.997 accuracy for the final CNN.'],
      stack: ['Python', 'Keras', 'TensorFlow', 'Scikit-learn'],
      links: { github: GH + 'Handwritten-Digit-Recognition--CNN-' }
    }),
    P({
      id: 'battery-rul', name: 'Battery Remaining-Useful-Life Prediction',
      cats: ['ai', 'embedded'],
      tagline: 'Regression models that estimate how long a battery has left.',
      desc: 'Predictive-maintenance study that preprocesses battery cycling data and compares regression models such as KNN.',
      points: ['Feature / target split, train-test split and model comparison.', 'Slides and report included with the notebook.'],
      stack: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn'],
      links: { github: GH + 'Battery-RUL-Prediction' }
    }),
    P({
      id: 'house-prices', name: 'House Prices — Feature Selection',
      cats: ['ai'],
      tagline: 'Which features actually matter? Filter, wrapper and embedded methods, compared.',
      desc: 'A tutorial-style notebook that applies several feature-selection techniques to a housing dataset and explains their trade-offs.',
      points: ['Filter methods, wrapper methods (mlxtend) and model-based selection.', 'Focus on interpretability and model performance.'],
      stack: ['Python', 'Scikit-learn', 'mlxtend', 'Pandas'],
      links: { github: GH + 'Houses-Prices-Feature-Selection' }
    }),
    P({
      id: 'gender-voice', name: 'Gender Recognition from Voice',
      cats: ['ai', 'vision'],
      tagline: 'Classifies a speaker\'s gender from acoustic features.',
      desc: 'Speech-recognition course project: acoustic feature dataset, cleaning, model training and evaluation.',
      points: ['Data cleaning and feature analysis.', 'Scikit-learn classifiers trained and evaluated.'],
      stack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
      links: { github: GH + 'Gender-Recognition--Speech-Recognition-' }
    }),
    P({
      id: 'domain-copilot', name: 'Domain Copilot — Agentic RAG', status: 'In progress',
      cats: ['ai', 'web'],
      tagline: 'An audited AI copilot for industrial field-maintenance technicians.',
      desc: 'A technician describes an equipment symptom; the system identifies the machine and manual revision, retrieves the diagnostic sequence with safety prerequisites enforced structurally, and drafts a work order that a supervisor must approve. Every run can be replayed step by step.',
      points: ['Clean Architecture (ports & adapters) with a dependency-free domain layer.', 'Audit & replay design: each run is identified by an ID and can be reproduced.', 'Currently an early scaffold.'],
      stack: ['Python', 'RAG', 'LLM agents', 'Clean Architecture'],
      links: { github: GH + 'domain-copilot' }
    }),

    /* ------------------------------------------------------------------ */
    /*  COMPUTER VISION & SPEECH                                           */
    /* ------------------------------------------------------------------ */
    P({
      id: 'attendance-face', name: 'Face-Recognition Attendance — Smart Lab & Lecture Hall',
      cats: ['vision', 'ai', 'iot', 'web'],
      tagline: 'Walk in, get recognized, get marked present — and the room reacts.',
      desc: 'A Python face-recognition attendance system that takes video from an ESP32-CAM and talks to an ESP32 room controller. Deployed as a Smart Lab and a Smart Lecture Hall variant.',
      points: [
        'Tkinter application with an ESP-CAM stream handler, image capture for training, and per-day attendance CSVs.',
        'ESP32 controller with an RFID reader, a web UI served from flash and mDNS discovery (esp32.local); the PC and ESP32 talk over TCP.',
        'Extended integration script links recognition results to the room controller.'
      ],
      stack: ['Python', 'OpenCV', 'Tkinter', 'Pandas', 'ESP32', 'ESP32-CAM', 'RFID', 'TCP / mDNS']
    }),
    P({
      id: 'mini-siri', name: 'Mini Siri', cats: ['vision', 'ai', 'interactive'],
      tagline: 'A tiny voice assistant that listens, searches and opens apps.',
      desc: 'Captures the microphone, converts speech to text and executes predefined commands, including web searches.',
      points: ['SpeechRecognition recognizer for voice-to-text.', 'Commands mapped to actions with subprocess and Google search.'],
      stack: ['Python', 'SpeechRecognition', 'googlesearch', 'subprocess'],
      links: { github: GH + 'Mini-Siri--Speech-Recognition-' }
    }),
    P({
      id: 'text-to-speech', name: 'Text-to-Speech Web App', cats: ['vision', 'web'],
      tagline: 'Type text, pick a voice, hear it spoken.',
      desc: 'A browser app built on the Web Speech API with a voice picker. Built as a two-person project.',
      points: ['Uses speechSynthesis and getVoices() to populate the voice picker.'],
      stack: ['JavaScript', 'Web Speech API', 'HTML / CSS'],
      links: { github: GH + 'Text-to-Speech' }
    }),

    /* ------------------------------------------------------------------ */
    /*  IOT / SMART SPACES                                                 */
    /* ------------------------------------------------------------------ */
    P({
      id: 'smart-building', name: 'Smart Building',
      cats: ['iot'],
      tagline: 'Rooms with sensors and actuators on their own Wi-Fi network.',
      desc: 'A building-automation prototype. A main ESP32 node hosts a web API and exchanges data with a second node over UDP; an ESP32-CAM adds video.',
      points: [
        'Per-room DHT and MQ-135 sensors, RFID access, LEDs, servos and motors.',
        'REST endpoints for LEDs, servo, pump, motor, fan, brightness and an auto/manual mode switch.',
        'Settings persisted with the Preferences library; UDP link on port 4210.'
      ],
      stack: ['ESP32', 'ESP32-CAM', 'DHT', 'MQ-135', 'MFRC522', 'UDP', 'REST API']
    }),
    P({
      id: 'ev-charging-station', name: 'EV Charging Station',
      cats: ['iot', 'robotics'],
      tagline: 'A charging station with slot sensing, voltage display and a robot helper.',
      desc: 'An ESP32 station controller that senses which of four bays is occupied, switches relays and shows voltage, coordinating with a second ESP32 (the robot) over UDP.',
      points: [
        'Four IR slot sensors, relay outputs, buzzer, servo and a voltage sensor with two LCDs.',
        'REST endpoints (/api/sensors, /api/station-status) and a UDP link to the robot on the workshop network.'
      ],
      stack: ['ESP32', 'UDP', 'REST', 'Relays', 'LCD I²C', 'ESP32Servo']
    }),
    P({
      id: 'smart-bike', name: 'Smart Bike Rental & Safety',
      cats: ['iot'],
      tagline: 'Tap to rent, tap to pay — and get an SMS if the bike falls or is hit.',
      desc: 'Two prototypes: an RFID-based rental and payment flow with a web dashboard, and a safety system with tilt, impact and GPS reporting.',
      points: [
        'Rental: a tag starts the rental, a card completes payment; warnings for invalid cards and timeouts; API for status, logs and unlock.',
        'Safety: MPU-6050 tilt, vibration impact, GPS location and SMS through a SIM800L; a second ESP32 controls the servo lock over HTTP.'
      ],
      stack: ['ESP32', 'RFID', 'MPU-6050', 'GPS', 'SIM800L', 'SPIFFS', 'REST']
    }),
    P({
      id: 'smart-bin', name: 'Smart Waste-Sorting Bin',
      cats: ['iot', 'agri'],
      tagline: 'Sorts dry, wet and metal waste automatically.',
      desc: 'An ESP32 bin that detects an object, classifies it with IR, metal and moisture sensors and rotates to the right compartment before opening the lid.',
      points: ['Two servos: bin rotation and lid; buzzer feedback.', 'Runs a Wi-Fi hotspot with a dashboard and counters you can reset from the API.'],
      stack: ['ESP32', 'IR / metal / rain sensors', 'Servos', 'Web dashboard']
    }),
    P({
      id: 'smart-safe', name: 'Smart Safe (STM32)',
      cats: ['iot'],
      tagline: 'RFID + keypad lock that also fights fire and burglars.',
      desc: 'A secure box on an STM32 with two unlock options and two independent alarms.',
      points: ['Authorized RFID cards or a 4×4 keypad password open the gate.', 'Flame sensor and vibration switch trigger a pulsing alarm, including a 3-second tail after vibration stops.'],
      stack: ['STM32', 'MFRC522', 'Keypad', 'Servo', 'Flame sensor']
    }),
    P({
      id: 'smart-traffic-square', name: 'Al-Shahabiya Square Traffic Controller',
      cats: ['iot', 'vision'],
      tagline: 'A model city square with traffic lights, lane sensing and an emergency override.',
      desc: 'An ESP32 controller with lane IR sensors and voice prompts, plus an ESP32-CAM whose reports can override the lights.',
      points: ['REST API to switch traffic between AUTO and forced red/yellow/green.', 'DFPlayer voice output, LCD status and mDNS name esp32.local.', 'Emergency data from the camera node is received and handled.'],
      stack: ['ESP32', 'ESP32-CAM', 'DFPlayer Mini', 'LCD I²C', 'REST / mDNS']
    }),
    P({
      id: 'solar-tracker', name: 'Solar Light Tracker',
      cats: ['iot', 'embedded', 'agri'],
      tagline: 'Finds the brightest direction and remembers it.',
      desc: 'A servo sweeps an LDR from 0° to 130° in 10° steps, records the brightest angle and sets LED brightness accordingly.',
      points: ['Sweeps reset the max-light tracker each pass.', 'LED intensity levels follow the measured light.'],
      stack: ['Arduino', 'LDR', 'Servo', 'PWM LEDs']
    }),
    P({
      id: 'gas-fire-safety', name: 'Gas & Fire Safety Systems',
      cats: ['iot'],
      tagline: 'MQ gas sensor + flame sensor + servos and relays that shut things down.',
      desc: 'Two Arduino Nano safety controllers built around active-low digital sensor outputs, with a servo-based shutoff version and a relay-based fire-fighter alarm.',
      points: ['MQ-2 / MQ-135 gas and flame sensing with LEDs and buzzer.', 'Blink-and-beep alarm timing and immediate relay activation.'],
      stack: ['Arduino Nano', 'MQ-2 / MQ-135', 'Flame sensor', 'Servos', 'Relay']
    }),
    P({
      id: 'smart-home-controller', name: 'Smart Home Controller Nodes',
      cats: ['iot'],
      tagline: 'Keypad door lock and environment panel, on one ESP32 access point.',
      desc: 'ESP32 nodes that combine a keypad password lock, temperature/humidity, smoke, rain and soil-moisture sensing with a phone-friendly dashboard, plus a touch-screen variant with a relay and clock.',
      points: ['Access-point mode with a live web dashboard.', 'Touch LCD shield version adds DHT22, TM1637 clock, RTC and relay control.'],
      stack: ['ESP32', 'DHT11 / DHT22', 'MQ-2', 'Keypad', 'TFT touch LCD', 'RTC']
    }),
    P({
      id: 'astro-attendance', name: 'ASTRO RFID Attendance',
      cats: ['iot', 'web'],
      tagline: 'Tap in, tap out — straight into a Google Sheet.',
      desc: 'ESP32 RFID station for staff clock-in/clock-out with an LCD, LEDs and buzzer, syncing to Google Sheets.',
      points: ['NTP time sync and employee database on the device.', 'HTTPS payload to a Google Apps Script web app that records the event.', 'Automatic I²C address scan for the LCD.'],
      stack: ['ESP32', 'MFRC522', 'NTP', 'Google Apps Script', 'HTTPS']
    }),
    P({
      id: 'car-counter', name: 'Parking Car Counter',
      cats: ['embedded', 'iot'],
      tagline: 'Two IR beams count cars in and out on a 7-segment display.',
      desc: 'An entrance and exit sensor pair keeps a running total displayed on a common-cathode 7-segment digit.',
      points: ['Direction sensing from the order in which the beams break.'],
      stack: ['Arduino', 'IR sensors', '7-segment']
    }),
    P({
      id: 'thermal-pump-controller', name: 'Big Water Pump Controller',
      cats: ['embedded', 'agri'],
      tagline: 'Pick one of six temperature probes on a keypad, run the pump with two buttons.',
      desc: 'An Arduino Nano industrial-style controller with six DS18B20 probes, a 4×4 keypad selector and an LCD.',
      points: ['Type a sensor number and # to see its live temperature.', 'Relay turns off the moment both buttons are released.'],
      stack: ['Arduino Nano', 'DS18B20', 'Keypad', 'LCD I²C', 'Relay']
    }),

    /* ------------------------------------------------------------------ */
    /*  AGRICULTURE & ENVIRONMENT                                          */
    /* ------------------------------------------------------------------ */
    P({
      id: 'smart-greenhouse', name: 'Smart Greenhouse Monitor',
      cats: ['agri', 'iot'],
      tagline: 'Four temperature/humidity sensors, air quality and a dashboard on the greenhouse Wi-Fi.',
      desc: 'An ESP32 environmental monitor with four DHT22 sensors and MQ-135 air-quality inputs that serves a full dashboard at 192.168.4.1.',
      points: ['JSON endpoints for current values and history.', 'Dashboard is stored in firmware and needs no internet.'],
      stack: ['ESP32', 'DHT22 ×4', 'MQ-135', 'Web dashboard']
    }),
    P({
      id: 'smart-farm-controller', name: 'Smart Farm Controller',
      cats: ['agri', 'iot', 'web'],
      tagline: 'Pump, fan and alarms — automatic on the Nano, remote-controlled from the browser.',
      desc: 'Two layers: a standalone Nano controller with LCD status, temperature/smoke alerts and pump timeout, and an ESP32 web panel (HTML and a React component) for manual control.',
      points: ['Fan and LED turn on when temperature or smoke is high; buzzer patterns signal the fault.', 'ESP32 exposes /sensor and /control endpoints polled by the dashboard.'],
      stack: ['Arduino Nano', 'ESP32', 'DS18B20', 'MQ-2', 'React', 'LCD I²C']
    }),
    P({
      id: 'smart-watering', name: 'Smart Watering System',
      cats: ['agri', 'iot'],
      tagline: 'Soil moisture in, water out, from a phone.',
      desc: 'ESP32 watering unit with soil sensing, relay pump, servo and LCD, serving an animated web page with gauge arcs.',
      points: ['/sensor and /water endpoints with one-second live updates.'],
      stack: ['ESP32', 'Soil sensor', 'Relay', 'Servo', 'LCD I²C']
    }),
    P({
      id: 'smart-planter', name: 'Smart Planter (STM32)',
      cats: ['agri'],
      tagline: 'Calibrated soil moisture drives the pump; temperature drives the fan.',
      desc: 'STM32 planter controller using a DHT11 and analog soil probe with pump and fan relays.',
      points: ['Moisture normalized to 0–100 % with threshold control.', 'Active-low relay handling and clear serial status.'],
      stack: ['STM32', 'DHT11', 'Soil sensor', 'Relays']
    }),

    /* ------------------------------------------------------------------ */
    /*  ROBOTICS & VEHICLES                                                */
    /* ------------------------------------------------------------------ */
    P({
      id: 'military-vehicle', name: 'RC Camera Vehicle',
      cats: ['robotics', 'vision'],
      tagline: 'Bluetooth RC vehicle with high-current drivers, a pan/tilt camera and lights.',
      desc: 'ESP32 controlling two BTS7960 motor drivers over Bluetooth, with a servo camera mount, relay lights and an ESP32-CAM stream.',
      points: ['Full command set: drive, servo angles, lights.', 'Camera web server on a companion ESP32-CAM.'],
      stack: ['ESP32', 'ESP32-CAM', 'BTS7960', 'Bluetooth', 'Servo']
    }),
    P({
      id: 'fighter-car', name: 'Fighter Car',
      cats: ['robotics', 'interactive'],
      tagline: 'A Wi-Fi combat robot with spinning blades and keyboard control.',
      desc: 'ESP32 robot with a browser controller (arrow-key input, blade toggles) and a Bluetooth variant.',
      points: ['Web page served by the robot; /control endpoint for driving and “Blades ON/OFF”.'],
      stack: ['ESP32', 'Web server', 'Bluetooth Serial', 'L298N']
    }),
    P({
      id: 'firefighter-car', name: 'Fire-Fighting Robot',
      cats: ['robotics', 'iot'],
      tagline: 'Drives toward the heat and sprays water.',
      desc: 'An Arduino robot with three analog temperature sensors (left, centre, right). It steers toward the hottest side, then activates a pump relay; a servo is part of the sprayer.',
      points: ['Averaged sensor readings with a margin to avoid jitter.', 'Pump triggers above a set heat level.'],
      stack: ['Arduino', 'Temperature sensors', 'Relay pump', 'Servo', 'L298N']
    }),
    P({
      id: 'rc-cars', name: 'Bluetooth RC & Obstacle-Avoiding Cars',
      cats: ['robotics', 'interactive'],
      tagline: 'A soccer car and an ultrasonic smart car on Bluetooth control.',
      desc: 'ESP32 vehicles controlled from a phone app; one adds ultrasonic obstacle avoidance and a buzzer.',
      points: ['Speed levels and directions mapped from a Bluetooth RC app.', 'Non-blocking ultrasonic timing.'],
      stack: ['ESP32', 'Bluetooth Serial', 'L298N', 'HC-SR04']
    }),
    P({
      id: 'autonomous-mini-robots', name: 'Line-Follower, Maze & Sumo Robots',
      cats: ['robotics'],
      tagline: 'Three classic competition robots, each with a different sensing strategy.',
      desc: 'A family of small robots covering line following (2-IR analog, 3-IR and a QTR array with calibration), maze solving and sumo.',
      points: ['Line follower classifies gentle vs sharp turns and stops when the line is lost.', 'Maze robot scans front, left and right by ultrasonic.', 'Sumo robot turns toward the target it detects.'],
      stack: ['Arduino', 'ESP32', 'IR / QTR sensors', 'HC-SR04', 'L298N']
    }),
    P({
      id: 'pid-motor', name: 'PID DC Motor Speed Controller',
      cats: ['robotics', 'embedded'],
      tagline: 'Closed-loop speed control with live-tunable gains.',
      desc: 'ESP32 with a BTS driver and rotary encoder feedback; potentiometers set target speed and Kp; results on an LCD.',
      points: ['Real-time PID loop with encoder speed measurement.'],
      stack: ['ESP32', 'BTS driver', 'Encoder', 'LCD I²C']
    }),
    P({
      id: 'ultrasonic-radar', name: 'Ultrasonic Radar',
      cats: ['embedded', 'robotics'],
      tagline: 'A servo-swept sonar with an alarm and hysteresis.',
      desc: 'Sweeps an HC-SR04 across an arc, prints distance and angle, and sounds the alarm under 20 cm until the target moves past 25 cm.',
      points: ['Hysteresis avoids alarm flicker.'],
      stack: ['Arduino', 'HC-SR04', 'Servo', 'LED / buzzer']
    }),

    /* ------------------------------------------------------------------ */
    /*  EMBEDDED / ELECTRONICS / INTERACTIVE                               */
    /* ------------------------------------------------------------------ */
    P({
      id: 'arabic-keyboard', name: 'Custom Arabic USB Keyboard',
      cats: ['embedded', 'interactive'],
      tagline: '69 keys, a 7×10 matrix, Arabic typing and a sound for every press.',
      desc: 'An ESP32-S3 USB HID keyboard built from scratch with debounced matrix scanning and Arabic UTF-8 key mapping.',
      points: ['Sends Alt+Shift to switch input language.', 'DFPlayer Mini plays audio on key press.', 'Companion firmware records 10 seconds of I²S audio to SD.'],
      stack: ['ESP32-S3', 'USB HID', 'DFPlayer Mini', 'INMP441', 'SD']
    }),
    P({
      id: 'air-mouse', name: 'Air Mouse', cats: ['embedded', 'interactive'],
      tagline: 'Wave your hand to move the cursor.',
      desc: 'ESP32 Bluetooth LE mouse driven by an MPU-6050, with left and right buttons.',
      points: ['Gyro axes mapped to cursor movement with adjustable speed.'],
      stack: ['ESP32', 'BLE Mouse', 'MPU-6050']
    }),
    P({
      id: 'smart-coffee-cup', name: 'Smart Coffee Cup', cats: ['embedded', 'interactive'],
      tagline: 'Knows when you can drink it, when it\'s empty and asks for more.',
      desc: 'A cup coaster with a load cell, temperature sensor, servo, LCD and voice alerts.',
      points: ['Tracks whether a cup is present and how full it is.', 'Waits while too hot; announces “Coffee finished” when empty.'],
      stack: ['Arduino', 'HX711', 'DHT', 'DFPlayer Mini', 'Servo']
    }),
    P({
      id: 'memory-game', name: 'Two-Player Memory Game', cats: ['interactive', 'embedded'],
      tagline: 'A Simon-style RGB memory duel with voice and levels.',
      desc: 'Arduino game where players repeat colour sequences on their own buttons and LEDs; rounds get harder and winners are announced.',
      points: ['Start-button debounce and double-click; inactivity sleep.', 'DFPlayer audio and LCD messages for every state.'],
      stack: ['Arduino', 'DFPlayer Mini', 'LCD I²C', 'RGB LEDs']
    }),
    P({
      id: 'smart-wallet', name: 'Smart Wallet Checklist', cats: ['embedded', 'interactive'],
      tagline: 'Never leave home without your phone, keys or ID.',
      desc: 'RFID-triggered reminder that walks through a checklist on an LCD and confirms with a green light.',
      points: ['Tap the card to step through checklist questions: money, visa card, keys, phone, university ID.'],
      stack: ['Arduino', 'MFRC522', 'LCD I²C', 'LEDs / buzzer']
    }),
    P({
      id: 'clocks', name: 'Digital Clocks & Alarms', cats: ['embedded'],
      tagline: 'A big 7-segment clock and a persistent alarm clock.',
      desc: 'Clock 1: 4-digit 7447 BCD display with RTC. Clock 2: DS3231 + TM1637 with alarm times stored in EEPROM and four control buttons.',
      points: ['Alarm survives power loss via EEPROM.'],
      stack: ['Arduino', 'DS3231', 'TM1637', '7447 BCD', 'EEPROM']
    }),
    P({
      id: 'digital-compass', name: 'OLED Digital Compass', cats: ['embedded'],
      tagline: 'QMC5883L heading with a 10-second calibration.',
      desc: 'Magnetometer compass with SSD1306 OLED, calibration routine and heading offset.',
      points: [],
      stack: ['Arduino', 'QMC5883L', 'SSD1306']
    }),
    P({
      id: 'audio-sensing', name: 'I²S Microphone Sound Meter & Direction', cats: ['embedded', 'vision'],
      tagline: 'INMP441 digital microphones: RMS to decibels and sound-source direction.',
      desc: 'Reads 24-bit I²S samples, computes RMS energy and dB, and a second sketch estimates sound direction.',
      points: ['16 kHz sampling with a 4096-sample energy window and 50 ms updates.'],
      stack: ['ESP32', 'I²S', 'INMP441']
    }),
    P({
      id: 'rfid-audio', name: 'RFID Audio Toy', cats: ['embedded', 'interactive'],
      tagline: 'Touch a card, hear a track.',
      desc: 'MFRC522 reads cards and plays the matching DFPlayer track; buttons handle play, previous and next.',
      points: [],
      stack: ['Arduino', 'MFRC522', 'DFPlayer Mini']
    }),
    P({
      id: 'sensor-bench', name: 'Sensor & Peripheral Test Benches', cats: ['embedded'],
      tagline: 'The small programs behind the big ones.',
      desc: 'A library of verified test sketches used to characterize parts before integration.',
      points: ['MAX30102 (heart rate and SpO₂) and MAX30100, HX711 load cell, SH1106 OLED, ESP32-CAM web streaming, RFID, flex sensors, DFPlayer, L298N motor driver, DHT22 + MQ-135 + flame node.'],
      stack: ['Arduino', 'ESP32', 'I²C', 'SPI', 'UART']
    }),

    P({
      id: 'smart-glasses-ai', name: 'Smart Glasses — AI Vision & Voice', status: 'Team project',
      cats: ['vision', 'ai', 'healthcare', 'embedded'],
      tagline: 'Glasses that recognise faces, read currency, name colours and talk back.',
      desc: 'A team project: an assistive vision-and-audio stack for smart glasses, with a Raspberry Pi on the glasses streaming camera, microphone and speaker over the network to a Python application that does the heavy AI work.',
      points: [
        'Switchable vision modes: currency detection (YOLO), colour identification (K-Means), face detection and a full register → train → recognise flow for people.',
        'Speech: Vosk speech-to-text and Piper text-to-speech services, microphone capture and MP3 playback streamed over TCP to the Pi.',
        'Raspberry Pi GPIO control through pigpio, with a Tkinter dashboard for live pin state and PWM, plus button and mDNS-discovery services.',
        'Service-oriented Python code base (handlers, models and services) built together with teammates.'
      ],
      stack: ['Python', 'OpenCV', 'YOLO', 'K-Means', 'Vosk', 'Piper TTS', 'Raspberry Pi', 'pigpio', 'Tkinter', 'TCP / mDNS']
    }),
    P({
      id: 'firefighter-vr', name: 'Firefighter Simulator VR', status: 'Team project',
      cats: ['interactive'],
      tagline: 'Train in VR: grab a hose, fight a fire that spreads, and respond to the alarm.',
      desc: 'A Unity VR training game built with a team. Fire behaves like a living system — it spreads to neighbours and only dies when soaked long enough — and the player handles a real hose.',
      points: [
        'Fire simulation: each fire counts burning neighbours within a radius, ignites or is extinguished by timers, and reacts to water hits through an IWaterInteractable interface.',
        'Hose system with rope handling, handle movement and water collision.',
        'Fire-station menu scene and a game scene, with alarm, radio, narrator and audience controllers.',
        'Configured for Oculus / Quest headsets.'
      ],
      stack: ['Unity', 'C#', 'VR (Oculus / Quest)', 'Blender', 'Particle systems']
    }),
    P({
      id: 'planets-vr', name: 'Planets Exploration — Space Education VR', status: 'Team project',
      cats: ['interactive'],
      tagline: 'Fly a spaceship through the solar system and learn each planet by voice — then take the quiz.',
      desc: 'An educational Unity XR experience: planets are brought to the centre of the scene with narration, descriptions and sound, and a quiz checks what you learned.',
      points: [
        'Every planet is a data object with a name, description and its own narration clip (Mercury to Neptune).',
        'A UI-and-audio controller reacts to cutscene events when a planet moves to the centre.',
        'Quiz manager with correct / incorrect answer sounds; spaceship interior, gloves and warp-speed effects.',
        'Built on OpenXR, the Oculus package and the XR Interaction Toolkit.'
      ],
      stack: ['Unity', 'C#', 'OpenXR', 'Oculus XR', 'XR Interaction Toolkit', 'Spatial audio']
    }),
    P({
      id: 'physics-lab-3d', name: '3D Physics Lab', status: 'Team project',
      cats: ['interactive'],
      tagline: 'Interactive Unity experiments: colliding cubes that compute π, projectiles, pendulums and free fall.',
      desc: 'A virtual physics laboratory where each experiment is defined in JSON with its own adjustable parameters and rendered with live trajectory graphs.',
      points: [
        'Experiments: Cubic π (elastic cube collisions to approximate π to N decimals), projectile motion, simple pendulum and free fall.',
        'Air-resistance model, cannon behaviour and 2D / 3D trajectory graph renderers.',
        'Menu driven by a JSON experiment catalogue; outline-based object selection using the open-source QuickOutline asset.'
      ],
      stack: ['Unity', 'C#', 'JSON', 'Physics simulation', 'Data visualisation']
    }),

    /* ------------------------------------------------------------------ */
    /*  WEB & MOBILE APPS                                                  */
    /* ------------------------------------------------------------------ */
    P({
      id: 'souq', name: 'SouQ — Arabic Digital Marketplace', featured: true,
      cats: ['web'],
      tagline: 'Buy and sell software, templates, courses and more, in Arabic.',
      desc: 'A full-stack digital-goods marketplace with an Arabic-first interface.',
      points: ['Next.js 16 front end, NestJS API, PostgreSQL storage and Redis caching.', 'Docker Compose infrastructure.'],
      stack: ['Next.js 16', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'Docker'],
      status: 'Active development'
    }),
    P({
      id: 'astro-store', name: 'ASTRO Store',
      cats: ['web'],
      tagline: 'Electronics e-commerce for the ASTRO community with a full admin panel.',
      desc: 'React + TypeScript storefront with a Node/Express backend on Firebase.',
      points: ['Email, Google OAuth and phone-OTP (Twilio) sign-in with JWT sessions.', 'Cart, checkout, order history and profiles; admin dashboard with sales stats and low-stock alerts.'],
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Firebase', 'Twilio', 'Vercel']
    }),
    P({
      id: 'astro-sites', name: 'ASTRO Websites', cats: ['web'],
      tagline: 'Marketing and shop sites for the ASTRO makerspace in New Damietta.',
      desc: 'A landing site and an electronics-store front (products, cart, services, contact) for ASTRO.',
      points: [],
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS']
    }),
    P({
      id: 'smart-money-guide', name: 'Smart Money Guide (CashIQ)',
      cats: ['web'],
      tagline: 'A bilingual personal-finance app with goals, reports and dark mode.',
      desc: 'Expense-management app built with Expo and React Native, with a Supabase back end, and a Flutter counterpart.',
      points: ['Dashboard, expense entry, goals, reports, notifications and settings.', 'Charts, Reanimated animations, English/Arabic support.'],
      stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Flutter']
    }),
    P({
      id: 'sheet-savvy', name: 'Sheet Savvy Stocks', cats: ['web'],
      tagline: 'Inventory, sales invoices and profit analytics for a small business.',
      desc: 'React inventory management app designed to sync with Google Sheets.',
      points: ['Low-stock alerts, logo invoices and interactive charts.'],
      stack: ['React', 'TypeScript', 'Google Sheets API', 'Charts']
    }),
    P({
      id: 'barq-panel', name: 'BarQ Reseller Panel', cats: ['web'],
      tagline: 'Dashboard for managing live-streaming servers, lines and resellers.',
      desc: 'React + TypeScript admin panel with Arabic branding: lines, bulk operations, EPG, MAG devices, resellers and settings.',
      points: ['Protected routes, modal workflows and CSV export.'],
      stack: ['React', 'TypeScript', 'Vite', 'React Router']
    }),
    P({
      id: 'playtopia', name: 'Playtopia', cats: ['web', 'interactive'],
      tagline: 'A gamer-focused storefront with live product search.',
      desc: 'A multi-page e-commerce prototype with product pages and a JavaScript search bar that filters items as you type.',
      points: [],
      stack: ['HTML', 'CSS', 'JavaScript']
    })
  ];

  window.PORTFOLIO = { profile, categories, projects };
  window.PORTFOLIO.byCat = (id) => projects.filter((p) => p.cats.includes(id));
  window.PORTFOLIO.cat = (id) => categories.find((c) => c.id === id);
})();
