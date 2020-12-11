var Data = [
[-51,-51,-54,-60,-52,-62,-66,-65,-45,-55,-67,-67,-53,-51,-69,-63,-53,-56,-68,-56,-55],
[-48,-48,-54,-59,-54,-62,-59,-65,-61,-52,-68,-65,-62,-68,-69,-65,-69,-64,-62,-73,-55],
[-52,-52,-54,-60,-64,-61,-62,-72,-63,-60,-72,-66,-77,-68,-72,-69,-69,-65,-68,-72,-58],
[-54,-54,-54,-58,-66,-66,-59,-63,-62,-61,-62,-65,-52,-69,-70,-69,-71,-70,-68,-72,-56],
[-52,-52,-55,-59,-70,-66,-58,-65,-62,-67,-63,-65,-54,-67,-66,-68,-65,-69,-68,-70,-53],
[-53,-53,-54,-58,-71,-67,-61,-62,-62,-65,-63,-64,-58,-68,-71,-65,-66,-69,-72,-72,-55],
[-53,-53,-54,-59,-73,-68,-61,-72,-62,-66,-67,-64,-68,-69,-65,-65,-66,-71,-70,-73,-59],
[-51,-51,-54,-58,-70,-61,-60,-71,-60,-63,-65,-64,-70,-66,-71,-65,-73,-70,-72,-72,-62],
[-52,-52,-54,-60,-72,-61,-61,-63,-60,-67,-70,-66,-66,-65,-71,-63,-67,-69,-72,-72,-57],
[-53,-53,-53,-57,-71,-65,-61,-69,-61,-63,-68,-65,-68,-66,-70,-62,-70,-68,-69,-70,-58],
[-53,-53,-54,-60,-70,-63,-61,-70,-66,-66,-73,-69,-70,-71,-71,-64,-69,-71,-77,-71,-61],
[-47,-47,-53,-62,-69,-66,-60,-70,-61,-66,-60,-67,-68,-70,-72,-64,-70,-65,-66,-73,-76],
[-47,-47,-53,-62,-65,-66,-62,-68,-59,-68,-72,-66,-66,-70,-73,-64,-68,-66,-80,-71,-76],
[-47,-47,-54,-60,-70,-61,-60,-66,-61,-65,-63,-71,-71,-67,-67,-64,-69,-66,-75,-70,-72],
[-47,-47,-53,-61,-69,-62,-61,-62,-60,-68,-64,-67,-70,-69,-66,-71,-69,-66,-76,-71,-68],
[-51,-51,-54,-64,-72,-62,-61,-64,-65,-68,-72,-67,-69,-70,-69,-73,-67,-66,-68,-74,-70],
[-52,-52,-53,-64,-71,-61,-64,-63,-62,-60,-74,-72,-70,-71,-70,-65,-70,-67,-69,-71,-72],
[-48,-48,-54,-64,-63,-66,-61,-66,-61,-61,-79,-64,-71,-71,-67,-66,-71,-68,-68,-70,-69],
[-53,-53,-55,-64,-70,-61,-61,-68,-59,-62,-78,-64,-71,-64,-67,-65,-64,-66,-68,-75,-70],
[-54,-54,-54,-62,-72,-61,-60,-65,-61,-68,-61,-64,-70,-71,-68,-72,-64,-71,-79,-77,-74],
[-47,-47,-54,-64,-63,-62,-59,-65,-60,-61,-65,-74,-73,-72,-67,-71,-69,-70,-76,-70,-74],
[-54,-54,-54,-69,-61,-62,-60,-61,-61,-67,-74,-78,-72,-67,-64,-65,-66,-67,-77,-74,-69],
[-51,-51,-53,-63,-63,-60,-61,-62,-66,-67,-61,-78,-70,-67,-70,-65,-70,-68,-69,-78,-67],
[-54,-54,-53,-63,-63,-62,-67,-63,-64,-66,-64,-64,-71,-66,-67,-72,-69,-67,-81,-72,-70],
[-53,-53,-54,-67,-61,-62,-67,-63,-60,-66,-63,-67,-69,-72,-65,-63,-68,-71,-75,-77,-75],
[-52,-52,-53,-67,-60,-66,-67,-64,-67,-61,-61,-65,-71,-71,-72,-70,-70,-69,-73,-72,-67],
[-53,-53,-53,-73,-64,-62,-59,-70,-59,-70,-61,-70,-70,-70,-71,-64,-67,-65,-72,-72,-75],
[-52,-52,-53,-63,-59,-62,-62,-68,-59,-70,-61,-66,-71,-67,-64,-72,-69,-72,-80,-77,-70],
[-51,-51,-53,-72,-59,-62,-69,-66,-63,-64,-77,-69,-69,-69,-63,-72,-66,-69,-72,-79,-75],
[-51,-51,-58,-68,-61,-61,-69,-69,-59,-69,-61,-65,-68,-70,-62,-66,-69,-71,-74,-72,-68],
[-51,-51,-54,-62,-64,-62,-59,-62,-61,-66,-61,-69,-69,-68,-64,-63,-69,-69,-75,-75,-75],
[-47,-47,-53,-62,-61,-61,-68,-67,-61,-68,-79,-63,-70,-68,-66,-66,-68,-67,-72,-74,-69],
[-51,-51,-52,-63,-62,-61,-68,-67,-67,-61,-79,-63,-72,-71,-70,-65,-65,-67,-69,-74,-76],
[-50,-50,-52,-69,-61,-64,-63,-69,-59,-67,-78,-76,-73,-72,-64,-70,-67,-72,-69,-75,-69],
[-48,-48,-52,-61,-62,-64,-63,-68,-68,-66,-62,-76,-69,-71,-65,-71,-67,-70,-69,-71,-66],
[-53,-53,-52,-70,-63,-60,-66,-67,-61,-66,-62,-62,-69,-71,-75,-67,-66,-71,-74,-71,-71],
[-53,-53,-54,-60,-61,-61,-68,-68,-59,-71,-70,-74,-69,-66,-65,-68,-66,-70,-75,-70,-72],
[-50,-50,-52,-68,-61,-62,-60,-67,-70,-62,-61,-63,-76,-69,-73,-65,-66,-66,-77,-80,-78],
[-51,-51,-54,-67,-60,-62,-62,-68,-63,-73,-59,-69,-71,-67,-69,-70,-68,-72,-71,-72,-76],
[-53,-53,-53,-68,-61,-64,-69,-63,-60,-66,-70,-70,-67,-66,-69,-71,-66,-72,-83,-71,-79],
[-50,-50,-52,-60,-61,-61,-60,-68,-60,-65,-62,-63,-77,-66,-64,-68,-69,-64,-73,-71,-69],
[-48,-48,-57,-63,-62,-63,-60,-67,-72,-64,-64,-69,-77,-66,-67,-70,-68,-65,-74,-71,-82],
[-48,-48,-53,-63,-60,-60,-62,-70,-64,-77,-62,-65,-68,-64,-71,-67,-68,-69,-74,-71,-74],
[-50,-50,-54,-73,-63,-61,-68,-63,-59,-65,-62,-65,-74,-66,-68,-66,-68,-69,-73,-71,-71],
[-53,-53,-53,-72,-64,-61,-60,-64,-72,-62,-63,-64,-68,-66,-69,-69,-65,-65,-73,-72,-70],
[-48,-48,-58,-62,-62,-61,-64,-65,-60,-73,-65,-64,-68,-68,-67,-72,-67,-66,-74,-81,-73],
[-50,-50,-58,-62,-61,-62,-68,-62,-62,-67,-75,-64,-75,-67,-69,-71,-72,-70,-80,-80,-74],
[-50,-50,-53,-63,-62,-64,-60,-63,-61,-66,-60,-64,-67,-66,-68,-69,-68,-67,-76,-72,-69],
[-50,-50,-54,-62,-61,-63,-67,-67,-60,-77,-62,-65,-77,-67,-69,-66,-69,-71,-78,-74,-73],
[-50,-50,-53,-64,-62,-61,-67,-66,-69,-68,-62,-64,-68,-67,-69,-66,-72,-69,-78,-75,-77],
[-49,-49,-57,-64,-61,-63,-67,-67,-63,-75,-74,-65,-68,-67,-69,-66,-70,-68,-75,-72,-82],
[-52,-52,-57,-83,-60,-66,-59,-66,-70,-75,-77,-65,-78,-66,-70,-65,-70,-69,-74,-71,-69],
[-52,-52,-57,-66,-60,-62,-65,-63,-60,-67,-65,-65,-77,-66,-69,-71,-72,-70,-74,-71,-75],
[-48,-48,-54,-67,-61,-63,-64,-65,-61,-76,-62,-65,-71,-67,-70,-68,-69,-68,-74,-80,-76],
[-50,-50,-56,-66,-60,-63,-60,-61,-61,-73,-66,-64,-71,-65,-69,-73,-67,-67,-71,-76,-69],
[-53,-53,-54,-67,-61,-62,-64,-61,-60,-62,-82,-86,-70,-66,-66,-75,-71,-67,-72,-69,-75],
[-50,-50,-53,-69,-60,-60,-64,-65,-73,-62,-66,-65,-73,-66,-70,-74,-71,-66,-79,-75,-68],
[-51,-51,-53,-69,-61,-65,-60,-61,-72,-61,-62,-65,-73,-70,-67,-73,-68,-70,-75,-79,-70],
[-51,-51,-56,-67,-61,-64,-64,-60,-59,-62,-62,-65,-73,-66,-70,-63,-74,-69,-74,-80,-71],
[-51,-51,-57,-69,-63,-64,-61,-66,-65,-61,-62,-65,-76,-66,-68,-67,-71,-74,-74,-69,-71],
[-52,-52,-54,-72,-59,-62,-65,-64,-61,-66,-86,-64,-72,-69,-68,-67,-73,-73,-76,-71,-80],
[-51,-51,-55,-68,-59,-61,-64,-66,-60,-67,-67,-75,-76,-65,-65,-65,-66,-74,-74,-68,-81],
[-52,-52,-54,-65,-60,-61,-61,-66,-66,-67,-65,-64,-70,-68,-69,-66,-67,-72,-71,-71,-72],
[-51,-51,-54,-67,-60,-61,-61,-65,-65,-66,-85,-65,-68,-64,-68,-74,-72,-72,-74,-72,-70],
[-51,-51,-54,-75,-59,-60,-64,-66,-69,-70,-83,-66,-73,-71,-69,-65,-73,-73,-83,-67,-71],
[-51,-51,-54,-67,-59,-61,-63,-64,-61,-67,-66,-66,-72,-67,-67,-66,-68,-67,-72,-73,-72],
[-51,-51,-54,-63,-64,-60,-59,-64,-61,-66,-62,-67,-75,-70,-69,-67,-68,-73,-72,-69,-71],
[-51,-51,-54,-62,-64,-60,-64,-61,-61,-80,-67,-72,-73,-66,-69,-74,-69,-70,-73,-77,-81],
[-46,-46,-55,-64,-59,-60,-62,-68,-67,-64,-65,-81,-71,-66,-71,-77,-68,-70,-74,-70,-73],
[-51,-51,-54,-63,-61,-59,-62,-67,-67,-73,-67,-80,-72,-71,-69,-74,-68,-67,-74,-71,-71],
[-51,-51,-55,-65,-62,-59,-62,-62,-60,-68,-83,-63,-73,-65,-69,-73,-69,-66,-73,-78,-78],
[-50,-50,-54,-63,-61,-61,-62,-62,-70,-67,-63,-79,-71,-66,-67,-69,-67,-66,-70,-77,-69],
[-50,-50,-56,-62,-63,-61,-63,-63,-64,-66,-62,-83,-80,-66,-67,-71,-74,-68,-70,-70,-70],
[-51,-51,-54,-79,-63,-60,-62,-63,-72,-74,-64,-66,-71,-67,-67,-65,-71,-69,-76,-71,-79],
[-50,-50,-53,-63,-63,-61,-62,-64,-66,-71,-64,-74,-73,-69,-67,-64,-69,-67,-70,-70,-72],
[-51,-51,-56,-62,-60,-59,-63,-60,-61,-72,-63,-65,-73,-65,-68,-67,-72,-65,-75,-79,-72],
[-50,-50,-55,-62,-64,-60,-64,-63,-60,-67,-66,-65,-72,-65,-69,-73,-69,-78,-75,-69,-75],
[-47,-47,-56,-62,-64,-61,-65,-67,-60,-72,-64,-64,-78,-64,-65,-67,-70,-68,-72,-70,-74],
[-50,-50,-55,-66,-63,-62,-60,-65,-61,-61,-64,-66,-74,-66,-65,-68,-70,-75,-71,-71,-71],
[-51,-51,-57,-77,-63,-60,-64,-67,-67,-61,-65,-66,-78,-66,-66,-67,-69,-68,-73,-70,-69],
[-51,-51,-52,-65,-63,-61,-63,-60,-70,-62,-63,-66,-72,-72,-68,-73,-69,-68,-73,-70,-69],
[-51,-51,-55,-62,-59,-61,-63,-68,-59,-71,-63,-65,-87,-72,-69,-67,-69,-68,-71,-68,-70],
[-50,-50,-54,-61,-60,-61,-63,-60,-60,-63,-79,-76,-77,-67,-70,-75,-70,-67,-74,-69,-75],
[-46,-46,-56,-64,-64,-61,-62,-64,-66,-63,-82,-76,-89,-68,-69,-69,-68,-65,-77,-78,-76],
[-47,-47,-55,-61,-64,-61,-70,-64,-61,-70,-62,-75,-74,-65,-68,-68,-70,-69,-80,-69,-72],
[-48,-48,-56,-80,-60,-59,-67,-60,-73,-70,-66,-65,-74,-67,-68,-67,-70,-69,-74,-80,-73],
[-49,-49,-54,-71,-59,-61,-67,-60,-73,-67,-63,-67,-85,-70,-66,-69,-69,-68,-79,-77,-74],
[-50,-50,-54,-80,-60,-61,-65,-70,-73,-65,-63,-65,-85,-65,-68,-68,-69,-69,-70,-66,-75],
[-51,-51,-53,-81,-58,-60,-69,-70,-62,-69,-72,-69,-71,-69,-70,-70,-69,-71,-71,-67,-76],
[-48,-48,-53,-68,-65,-60,-63,-59,-69,-68,-72,-65,-80,-68,-69,-69,-68,-70,-71,-67,-73],
[-51,-51,-54,-62,-67,-61,-67,-60,-69,-67,-71,-71,-82,-70,-70,-68,-68,-70,-69,-67,-75],
[-50,-50,-54,-61,-62,-59,-66,-58,-66,-66,-69,-72,-74,-70,-70,-67,-69,-69,-79,-69,-77],
[-46,-46,-52,-66,-66,-60,-67,-65,-66,-70,-62,-65,-73,-77,-70,-66,-69,-69,-76,-68,-75],
[-47,-47,-56,-69,-63,-60,-63,-66,-64,-63,-67,-71,-74,-71,-70,-71,-67,-68,-71,-72,-71],
[-47,-47,-52,-62,-64,-61,-64,-60,-72,-74,-62,-71,-75,-70,-67,-71,-67,-72,-71,-76,-73],
[-51,-51,-54,-67,-64,-60,-67,-58,-64,-66,-70,-80,-72,-72,-70,-69,-71,-70,-77,-71,-75],
[-50,-50,-56,-62,-61,-61,-64,-70,-61,-75,-62,-76,-71,-68,-69,-75,-68,-71,-71,-69,-71],
[-48,-48,-55,-68,-64,-61,-59,-58,-61,-63,-70,-73,-76,-70,-66,-71,-70,-69,-73,-68,-72],
[-50,-50,-53,-64,-65,-62,-65,-58,-69,-65,-62,-72,-78,-69,-67,-71,-70,-71,-72,-66,-70],
[-47,-47,-52,-67,-64,-62,-64,-59,-70,-65,-65,-62,-77,-69,-66,-66,-72,-71,-72,-71,-70],
[-54,-54,-58,-83,-73,-68,-70,-72,-73,-80,-86,-86,-89,-77,-75,-77,-74,-78,-83,-81,-82],
[-46,-46,-52,-57,-52,-59,-58,-58,-45,-52,-59,-62,-52,-51,-62,-62,-53,-56,-62,-56,-53]];