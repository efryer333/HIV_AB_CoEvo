/* JAVASCRIPT CODE GOES HERE */

Plotly.d3.csv("https://raw.githubusercontent.com/phamoh/HIV_AB_CoEvo/phamoh-patch-1/dataset_031519.csv",
    function(err, rows) {

        function unpack(rows, key) {
            return rows.map(function(row) {
                return row[key];
            });
        }

        var allPatientIDs = unpack(rows, 'patient_id'),
            allTimePoints = unpack(rows, 'time_point'),
            allHIVDivergenceNonsyn = unpack(rows, 'hiv_non_synonymous_divergence'),
            allHIVDivergenceSyn = unpack(rows, 'hiv_synonymous_divergence'),
            allABDivergence = unpack(rows, 'ab_divergence'),
            currentPatient,
            listofPatients = [],
            listofPatientsALL = [],
            currentHIV_NonSyn = [],
            currentHIV_Syn = [],
            currentAB_Diverg = [],
            currentTimePoint = [];

        //This affects the dropdown menu
        //This affects the dropdown menu

        for (var i = 0; i < allPatientIDs.length; i++) {
            if (listofPatientsALL.indexOf(allPatientIDs[i]) === -1) {
                listofPatientsALL.push(allPatientIDs[i]);
            }
        }
        listofPatientsALL.push("All Patients");


        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        };

        // This code populates the info to the plots and the dropdowns.
        var innerContainer4 = document.querySelector('[data-num4="0"]'),
            patientSelector4 = innerContainer4.querySelector('.patientdata4'),
            innerContainer5 = document.querySelector('[data-num5="0"]'),
            patientSelector5 = innerContainer5.querySelector('.patientdata5'),
            innerContainer6 = document.querySelector('[data-num6="0"]'),
            patientSelector6 = innerContainer6.querySelector('.patientdata6');


        assignOptions(listofPatientsALL, patientSelector4);
        assignOptions(listofPatientsALL, patientSelector5);
        assignOptions(listofPatientsALL, patientSelector6);

        var trace1 = [];
        var trace2 = [];

        function getPatientDataHIV_NonSyn(chosenPatient) {
            currentHIV_NonSyn = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allHIVDivergenceNonsyn,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentHIV_NonSyn.push(allHIVDivergenceNonsyn[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentHIV_NonSyn,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: 'rgb(50, 164, 103)',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };

        function getPatientDataHIV_Syn(chosenPatient) {
            currentHIV_Syn = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allHIVDivergenceSyn,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentHIV_Syn.push(allHIVDivergenceSyn[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentHIV_Syn,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: 'rrgb(255, 159, 255)',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };

        function getPatientDataABDiverg(chosenPatient) {
            currentAB_Diverg = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allABDivergence,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentAB_Diverg.push(allABDivergence[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentAB_Diverg,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: 'rgb(49, 79, 79)',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };

        setBubblePlotHIV_NonSyn("1");
        setBubblePlotHIV_Syn("1");
        setBubblePlotABDiverg("1");

        function setBubblePlotHIV_NonSyn(chosenPatient) {
            getPatientDataHIV_NonSyn(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'HIV Non-Synonymous Divergence of Patient: ' + chosenPatient,
                titlefont: {
                    family: 'Poppins, sans-serif',
                },
                xaxis: {
                    title: 'Estimated Time Since Infection (years)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                },
                yaxis: {
                    title: 'Divergence (dN)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv4', data, layout, { showSendToCloud: true, responsive: true });
        };

        function setBubblePlotHIV_Syn(chosenPatient) {
            getPatientDataHIV_Syn(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'HIV Synonymous Divergence of Patient:  ' + chosenPatient,
                titlefont: {
                    family: 'Poppins, sans-serif',
                },
                xaxis: {
                    title: 'Estimated Time Since Infection (years)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                },
                yaxis: {
                    title: 'Divergence (dS)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv5', data, layout, { showSendToCloud: true, responsive: true });
        };

        function setBubblePlotABDiverg(chosenPatient) {
            getPatientDataABDiverg(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'Antibody Divergence of Patient: ' + chosenPatient,
                titlefont: {
                    family: 'Poppins, sans-serif',
                },
                xaxis: {
                    title: 'Estimated Time Since Infection (years)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                },
                yaxis: {
                    title: 'Divergence',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv6', data, layout, { showSendToCloud: true, responsive: true });
        };


        function updatePatientHIV_NonSyn() {
            setBubblePlotHIV_NonSyn(patientSelector4.value);
        }

        function updatePatientHIV_Syn() {
            setBubblePlotHIV_Syn(patientSelector5.value);
        }

        function updatePatientABDiverg() {
            setBubblePlotABDiverg(patientSelector6.value);
        }

        patientSelector4.addEventListener('change', updatePatientHIV_NonSyn, false);
        patientSelector5.addEventListener('change', updatePatientHIV_Syn, false);
        patientSelector6.addEventListener('change', updatePatientABDiverg, false);


    });