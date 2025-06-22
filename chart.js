//File: chart.js
//GUI Assignment: Creating an Interactive Dynamic Table
//Salwan Sabil, UMass Lowell Computer Science, salwan_sabil@student.uml.edu
//Copyright (c) 2025 by Salwan. All rights reserved. May be freely copied or
//excerpted for educational purposes with credit to the author.
//updated by SS on June 22, 2025 at 1:30 PM

//jQuery validation plugin
$(document).ready(function () {
    $("#tableInput").validate({
        //validation rules (can't be blank, needs to be a number, between -50 and 50)
        rules: {
            multiplicandMin: {
                required: true, number: true, range: [-50, 50]
            },
            multiplicandMax: {
                required: true, number: true, range: [-50, 50]
            },
            multiplierMin: {
                required: true, number: true, range: [-50, 50]
            },
            multiplierMax: {
                required: true, number: true, range: [-50, 50]
            }
        },
        //message to user if validation doesn't work
        messages: {
            multiplicandMin: {
                required: "Enter a number for Min Multiplicand.", number: "Must be a number.", range: "Value must be between -50 and 50."
            },
            multiplicandMax: {
                required: "Enter a number for Max Multiplicand.", number: "Must be a number.", range: "Value must be between -50 and 50."
            },
            multiplierMin: {
                required: "Enter a number for Min Multiplier.", number: "Must be a number.", range: "Value must be between -50 and 50."
            },
            multiplierMax: {
                required: "Enter a number for Max Multiplier.", number: "Must be a number.", range: "Value must be between -50 and 50."
            }
        },
        //display message right after the input area
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        //will run only if validation is successful
        submitHandler: function (form) {
            const vMin = parseInt($("#multiplicandMin").val(), 10);
            const vMax = parseInt($("#multiplicandMax").val(), 10);
            const hMin = parseInt($("#multiplierMin").val(), 10);
            const hMax = parseInt($("#multiplierMax").val(), 10);
            const errorBox = $("#errorBox");
            errorBox.text("");

            if (vMin > vMax || hMin > hMax) {
                errorBox.text("Minimum values must be ≤ their maximums.");
                return;
            }
            //prevent a table too large
            const totalCells = (vMax - vMin + 1) * (hMax - hMin + 1);
            if (totalCells > 10000) {
                errorBox.text("Table too large. Reduce range.");
                return;
            }

            //build table
            let html = '<table class="table table-bordered table-sm text-center">';
            html += '<thead><tr><th></th>';
            for (let h = hMin; h <= hMax; h++) html += `<th>${h}</th>`;
            html += '</tr></thead><tbody>';

            for (let v = vMin; v <= vMax; v++) {
                html += `<tr><th>${v}</th>`;
                for (let h = hMin; h <= hMax; h++) html += `<td>${v * h}</td>`;
                html += '</tr>';
            }
            html += '</tbody></table>';
            $("#tableContainer").html(html);
        }
    });
});
