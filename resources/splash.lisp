; template for the hundred rabbits videos end screen
; drag 2 paths(import,export)
(clear)
; resize to render
(resize 1280 800)
(def frame-rect 
  (frame))
; fill background
(fill frame-rect "white")
; import character image path
(import $path 
  (guide 
    (circle frame-rect:c frame-rect:m 375)))
; draw text
(fill 
  (text 
    (frame-rect:c) 
    (mul frame-rect:m 1.6) "bold 45" "Support us on Patreon" "center" "Alte Haas Grotesk") "black")
; export render image path
(export $path)
; confirm
(echo "done.")