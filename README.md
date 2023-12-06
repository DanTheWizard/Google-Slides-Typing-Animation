
# Google Slides Typing animation

  

This repository hosts a code to create a typing animation in google slides.

  

It gets the selected textbox, then runs it though a piece of code that seperates it into parts while adding a pipe ( | ) at the end.

It will look like this:
```
|
A|
A |
A b|
A ba|
A bal|
A bald|
A bald |
A bald E|
A bald Ea|
A bald Eag|
A bald Eagl|
A bald Eagle|
A bald Eagle
```
  


  

## NOTE:

Google Slides (as of this time) does not have any support in appscript to create the animation itself.

So, to achieve the end result... it will take some time.

  

This is best done on a computer/web browser

  

  

## Usage

  

Feel free to explore the code and use it however you want.

  
  

How to use this code (this is going to be annoying...):

  

1. Select the textbox you want to have the animation

2. Run method 1 fromt the dropdwon (I got lazy working on method 2).

3. Wait for the script to finish

4. Select all of the new created text boxes

5. right click, and select animate

6. Set all of it to "Appear" and "After Previous"

7. Create blank text box off the side from the slide

8. Create animations for the blank text box "Fade In" and "With Previous"

9. For the number amount of the textboxes created, create the same amount of animations for the blank text box

10. Move each newly created blank text box animation after the "Appear & After Previous" text box

11. Now select the new created text boxes (the ones from the code)

12. Right Click and select animate (yes...)

13. Now for each new animations in the bottom of the list, change the animation to "Disappear" and "After Previous"

14. Now move each of them after the blank textbot "Fade In & With previous"

15. It should look like:
```
Appear (After Previous)
Fade in (With Previous) 
Disappear (After Previous)
repeat
```

16. The last one in the list now should be a disapear
17. Delete it, and click play
18. You should be good to go
  
(I might make a gif/video in the future)


Read the help menu in the dropdown list for a bit of explanation between method 1 and method 2
(I am lazy to copy it over)

  
  

## License

 
This project is open-source and available under the [MIT License](LICENSE). Feel free to fork it, contribute, or use it as inspiration for your own projects.

  

---

  

**Please note:** This code probably contains bunch of errors as I created it for fun and for my personal google slides projects