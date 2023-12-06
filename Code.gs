function onOpen() {
  var ui = SlidesApp.getUi();
  ui.createMenu('My New Anim Menu')
    .addItem('Run Code Test (Method 1)', 'showSelectedText')
    .addSeparator()
    .addItem('Method 1 (Line)', 'method1text')
    .addItem('Method 2 (Dup)', 'method2text')
    .addSeparator()
    .addItem('Changelog', 'showChangelog')
    .addItem('Help', 'showHelpMessage')
    .addToUi();
  //ui.alert('Hello,', "The code created for this slide is create by DanThe Wizard\n\nThis code is open-source and available under the MIT License on my GitHub :)", ui.ButtonSet.OK);
  ui.alert('Loaded Succesfully', "Code.gs V1.1.38 has been loaded\n\nChangelog:\nV1.1.38\nCreated a changelog menu to minimize the first message", ui.ButtonSet.OK);
}


function showHelpMessage() {
  var ui = SlidesApp.getUi();
  ui.alert('Help Message', "Slides app script does nto support of doing animations from code, so they have to be done manually!! \n\nMethod 1 (line): This method adds a line/pipe at the end to simulate as if it is being typed. It goes with the format of the first character in the texbtox \n---\nMethod 2 (Dup): This method keeps the formatting of the textbox but does not use the pipe at the end. (This should only be used when there are mutliple styling in the textbox) \n\nThats pretty much it", ui.ButtonSet.OK);
}

function showChangelog() {
  var ui = SlidesApp.getUi();
  ui.alert('Changelog:', "V1.1.38\nCreated a changelog menu to minimize the first message\n\n---\n\nV1.1.37\nUpon on using method 1, the original textbox will be deleted to remove the duplicate (fixing a visual bug)\n\n---\n\nV1.1.36\nFixed some bugs\nFixed some grammar\nAdded the help page\n\n---\n\nV1.1.35\nAdded the changelog feature (may move it to the menu sometime later)", ui.ButtonSet.OK);
}


function printPattern(inputString) {
  for (let i = inputString.length; i >= 0; i--) {
    let currentLine = '';
    currentLine += ' ' + inputString.substring(0, inputString.length - i);
    if (i !== 0) {
      currentLine += '|';
    }

    var ui = SlidesApp.getUi();
    //ui.alert('Code', currentLine, ui.ButtonSet.OK);
    console.log(currentLine);
    Logger.log(currentLine)
  }


  function removeLogMetadata(log) {
    // Define a regular expression to match the log metadata
    const regex = /^\w{3} \w{3} \d{2} \d{2}:\d{2}:\d{2} \w{3} \d{4} \w+: /gm;

    // Use the replace method to remove the matched metadata
    return log.replace(regex, '');
  }

  var cleaned_log = removeLogMetadata(Logger.getLog())

  ui.alert('Anim Type Test Output', cleaned_log, ui.ButtonSet.OK);
}




function showSelectedText() {
  var selection = SlidesApp.getActivePresentation().getSelection();
  
  if (selection) {
    var currentPage = selection.getCurrentPage();
    
    try {
      var selectedPageElements = selection.getPageElementRange().getPageElements();
    } catch (err) {
      var ui = SlidesApp.getUi();
      ui.alert('Error', 'Nothing was selected. \n' + err, ui.ButtonSet.OK);
    }
    

    if (selectedPageElements.length > 0) {
      var selectedElement = selectedPageElements[0]; // Assuming you want to get the text from the first selected element

      if (selectedElement.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
        var textBox = selectedElement.asShape();

        if (textBox.getText().asString().length > 0) {
          var ui = SlidesApp.getUi();
          var myselectedtext = textBox.getText().asString()
          //ui.alert('Selected Text', myselectedtext, ui.ButtonSet.OK);


          // Example usage
          printPattern(myselectedtext);


        } else {
          var ui = SlidesApp.getUi();
          ui.alert('Error', 'The selected text box is empty.', ui.ButtonSet.OK);
        }
      } else {
        var ui = SlidesApp.getUi();
        ui.alert('Error', 'Please select a text box.', ui.ButtonSet.OK);
      }
    } else {
      var ui = SlidesApp.getUi();
      ui.alert('Error', 'No elements selected.', ui.ButtonSet.OK);
    }
  }
}









function method2text() {
  var selection = SlidesApp.getActivePresentation().getSelection();
  
  if (selection) {
    try {
      var selectedPageElements = selection.getPageElementRange().getPageElements();
    } catch (err) {
      var ui = SlidesApp.getUi();
      ui.alert('Error', 'Nothing was selected. \n' + err, ui.ButtonSet.OK);
      return;
    }
    
    if (selectedPageElements.length > 0) {
      var selectedElement = selectedPageElements[0]; // Assuming you want to get the text from the first selected element

      if (selectedElement.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
        var textBox = selectedElement.asShape();
        var ui = SlidesApp.getUi();

        function donewanim() {
            //Future Idea
            //Loop through every single letter and get their style and then apply it
            var textbox_text = textBox.getText();
            
            // Get the formatting of each character
            for (var k = 0; k < textbox_text.getLength(); k++) {
              var roTB = textbox_text.getRange(k, k + 1);
              var roTBS = roTB.getTextStyle()
              
              if (k == 0) {
                var create_newtextbox = textBox.duplicate();
              } else {
                var create_newtextbox = previoustextbox.duplicate();
              }

              var newtextbox = SlidesApp.getActivePresentation().getPageElementById(create_newtextbox.getObjectId()).asShape();
              var textofnewtextbox = newtextbox.getText();
              var readtextofnewtextbox = textofnewtextbox.asString();

              if (k == 0) {
                newtextbox.getText().setText("")
              }
              
              if (k !== textbox_text.getLength()) {
                var newtextformat = newtextbox.getText().appendText(roTB.asString());
              } else {
                break
              }


              
              newtextformat.getTextStyle()
                      .setBold(roTBS.isBold())
                      .setItalic(roTBS.isItalic())
                      .setUnderline(roTBS.isUnderline())
                      .setForegroundColor(roTBS.getForegroundColor())
                      .setFontSize(roTBS.getFontSize())
                      .setFontFamily(roTBS.getFontFamily())
                      ;
              var previoustextbox =  SlidesApp.getActivePresentation().getPageElementById(create_newtextbox.getObjectId());
            }
          }

        //doanimation(textBox.getText())
        donewanim();

      } else {
        var ui = SlidesApp.getUi();
        ui.alert('Error', 'The selected text box is empty.', ui.ButtonSet.OK);
      }
    } else {
      var ui = SlidesApp.getUi();
      ui.alert('Error', 'Please select a text box.', ui.ButtonSet.OK);
    }
  } else {
    var ui = SlidesApp.getUi();
    ui.alert('Error', 'No elements selected.', ui.ButtonSet.OK);
  }
}




function method1text() {
  var selection = SlidesApp.getActivePresentation().getSelection();
  
  if (selection) {
    try {
      var selectedPageElements = selection.getPageElementRange().getPageElements();
    } catch (err) {
      var ui = SlidesApp.getUi();
      ui.alert('Error', 'Nothing was selected. \n' + err, ui.ButtonSet.OK);
      return;
    }
    
    if (selectedPageElements.length > 0) {
      var selectedElement = selectedPageElements[0]; // Assuming you want to get the text from the first selected element

      if (selectedElement.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
        var textBox = selectedElement.asShape();
        var ui = SlidesApp.getUi();

        function doanimation(inputString) {
          for (let i = inputString.length; i >= 0; i--) {
            let currentLine = '';
            currentLine += ' ' + inputString.substring(0, inputString.length - i);
            if (i !== 0) {
              currentLine += '|';
            }

          var create_newtextbox = textBox.duplicate();

          var newtextbox = SlidesApp.getActivePresentation().getPageElementById(create_newtextbox.getObjectId()).asShape();
          var textofnewtextbox = newtextbox.getText();
          var readtextofnewtextbox = textofnewtextbox.asString();

          textofnewtextbox.setText(currentLine);

          //TO DO:
          //Add Animation Config (show and hide)


          }
        }

        doanimation(textBox.getText().asString());
        textBox.remove(); //Delete it as in the end we create a new one
        
        

      } else {
        var ui = SlidesApp.getUi();
        ui.alert('Error', 'The selected text box is empty.', ui.ButtonSet.OK);
      }
    } else {
      var ui = SlidesApp.getUi();
      ui.alert('Error', 'Please select a text box.', ui.ButtonSet.OK);
    }
  } else {
    var ui = SlidesApp.getUi();
    ui.alert('Error', 'No elements selected.', ui.ButtonSet.OK);
  }
}


//OLD CODE
function duplicateAndCreateTextBox() {
  var selection = SlidesApp.getActivePresentation().getSelection();
  
  if (selection) {
    try {
      var selectedPageElements = selection.getPageElementRange().getPageElements();
    } catch (err) {
      var ui = SlidesApp.getUi();
      ui.alert('Error', 'Nothing was selected. \n' + err, ui.ButtonSet.OK);
      return;
    }
    
    if (selectedPageElements.length > 0) {
      var selectedElement = selectedPageElements[0]; // Assuming you want to get the text from the first selected element

      if (selectedElement.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
        var textBox = selectedElement.asShape();
        var ui = SlidesApp.getUi();
        ui.alert('Main Text', textBox.getText().asString(), ui.ButtonSet.OK);


        
        function doanimation(inputString) {
          for (let i = inputString.length; i >= 0; i--) {
            let currentLine = '';
            currentLine += ' ' + inputString.substring(0, inputString.length - i);
            if (i !== 0) {
              currentLine += '|';
            }

          var create_newtextbox = textBox.duplicate();

          
          //devID          ui.alert('Here', create_newtextbox.getObjectId(), ui.ButtonSet.OK);

          var newtextbox = SlidesApp.getActivePresentation().getPageElementById(create_newtextbox.getObjectId()).asShape();
          var textofnewtextbox = newtextbox.getText();
          var readtextofnewtextbox = textofnewtextbox.asString();


          textofnewtextbox.setText(currentLine);

          //TO DO:
          //Add Animation Config (show and hide)


          }
        }

        function objToString (obj) {
            return Object.entries(obj).reduce((str, [p, val]) => {
                return `${str}${p}::${val}\n`;
            }, '');
        }


        function donewanim() {
            //Future Idea
            //Loop through every single letter and get their style and then apply it
            var textbox_text = textBox.getText();
            
            // Get the formatting of each character
            for (var k = 0; k < textbox_text.getLength(); k++) {
              var roTB = textbox_text.getRange(k, k + 1);
              var roTBS = roTB.getTextStyle()

              //ui.alert('Main Text Type', k, ui.ButtonSet.OK);

              
              
              if (k == 0) {
                var create_newtextbox = textBox.duplicate();
              } else {
                var create_newtextbox = previoustextbox.duplicate();
              }

              var newtextbox = SlidesApp.getActivePresentation().getPageElementById(create_newtextbox.getObjectId()).asShape();
              var textofnewtextbox = newtextbox.getText();
              var readtextofnewtextbox = textofnewtextbox.asString();

              if (k == 0) {
                newtextbox.getText().setText("")
              }
              
              if (k !== textbox_text.getLength()) {
                //var newtextformat = newtextbox.getText().appendText(roTB.asString() + "|");
                var newtextformat = newtextbox.getText().appendText(roTB.asString());
              } else {
                //var newtextformat = newtextbox.getText().appendText(roTB.asString());
                break
              }


              
              newtextformat.getTextStyle()
                      .setBold(roTBS.isBold())
                      .setItalic(roTBS.isItalic())
                      .setUnderline(roTBS.isUnderline())
                      .setForegroundColor(roTBS.getForegroundColor())
                      .setFontSize(roTBS.getFontSize())
                      .setFontFamily(roTBS.getFontFamily())
                      //.setLinkUrl('www.example.com')
                      //.setForegroundColor('#ff0000')
                      ;
              var previoustextbox =  SlidesApp.getActivePresentation().getPageElementById(create_newtextbox.getObjectId());


            //ui.alert('Main Text Type', roTBS.getFontFamily(), ui.ButtonSet.OK);
            }
            
            //ui.alert('Main Text Type', textBox.getText().getLength(), ui.ButtonSet.OK);

            //var roTB = textBox.getText().getRange(0,1)
            //var roTBS = roTB.getTextStyle()
            //ui.alert('Main Text Type', roTBS.getFontFamily(), ui.ButtonSet.OK);
            }

        //doanimation(textBox.getText())
        donewanim();
        
        

      } else {
        var ui = SlidesApp.getUi();
        ui.alert('Error', 'The selected text box is empty.', ui.ButtonSet.OK);
      }
    } else {
      var ui = SlidesApp.getUi();
      ui.alert('Error', 'Please select a text box.', ui.ButtonSet.OK);
    }
  } else {
    var ui = SlidesApp.getUi();
    ui.alert('Error', 'No elements selected.', ui.ButtonSet.OK);
  }
}





