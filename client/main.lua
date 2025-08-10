AddEventHandler('onClientResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        SetNuiFocus(true, true)
    end
end)
