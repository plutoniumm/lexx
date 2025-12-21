open Js_of_ocaml
open Js_of_ocaml_toplevel

(* Initialize the toplevel environment *)
let () =
  JsooTop.initialize ();

  (* Define the 'execute' function callable from JS *)
  let execute source_code =
    let buffer = Buffer.create 100 in
    let formatter = Format.formatter_of_buffer buffer in

    (* Redirect standard output/error to our buffer *)
    JsooTop.execute true formatter source_code;

    (* Return the result as a string *)
    Js.string (Buffer.contents buffer)
  in

  (* Export the function to the global 'window' object via 'ocaml' object *)
  Js.export "ocaml"
    (object%js
       method run code = execute (Js.to_string code)
       method version = Js.string Sys.ocaml_version
    end)